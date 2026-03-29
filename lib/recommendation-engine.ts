/**
 * Gumi Recommendation Engine
 *
 * A vector-embedding–based recommender with collaborative filtering,
 * retrieval + reranking, and long-term / short-term user preference blending.
 *
 * Architecture:
 *   1. Product embeddings  — 32-dim dense vectors from category, price, brand,
 *      quality, social, and text features.
 *   2. User embeddings     — time-decayed weighted average of interacted product
 *      embeddings, split into long-term and short-term (session) vectors.
 *   3. CF latent vectors   — 16-dim implicit-feedback latent factors learned from
 *      co-interaction patterns (simulated ALS).
 *   4. Retrieval           — cosine-similarity nearest-neighbor over content embeddings.
 *   5. Reranking           — multi-signal score combining content similarity,
 *      CF score, social proof, freshness, and MMR diversity penalty.
 *   6. Normalization       — z-score → sigmoid mapping into display range [65, 98].
 */

import { Product } from "@/types";

// ────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────

const EMBEDDING_DIM = 32;
const CF_LATENT_DIM = 16;
const SESSION_WINDOW = 20;
const TIME_DECAY_HALF_LIFE_DAYS = 7;
const LONG_SHORT_BLEND = 0.6; // β — long-term weight

/** Interaction signal weights (implicit feedback strength). */
const INTERACTION_WEIGHTS = {
  view: 1.0,
  click: 1.5,
  dwell: 2.0,
  save: 3.0,
  share: 4.0,
  wishlist: 4.5,
  purchase: 6.0,
  dislike: -3.0,
} as const;

/** Reranking component weights (must sum to ~1 when diversity is 0). */
const RANK_WEIGHTS = {
  content: 0.35,
  collaborative: 0.25,
  social: 0.15,
  freshness: 0.10,
  diversity: 0.15,
} as const;

/** One-hot index for each product category. */
const CATEGORY_INDEX: Record<string, number> = {
  fashion: 0,
  shoes: 1,
  bags: 2,
  jewelry: 3,
  home: 4,
  kitchen: 5,
  beauty: 6,
  fragrance: 7,
  art: 8,
  tech: 9,
  wellness: 10,
  outdoors: 11,
  books: 12,
  plants: 13,
  food: 14,
};

// ────────────────────────────────────────────────────────────
// Math utilities
// ────────────────────────────────────────────────────────────

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function l2(v: number[]): number {
  return Math.sqrt(dot(v, v));
}

function normalize(v: number[]): number[] {
  const n = l2(v);
  return n < 1e-10 ? v.map(() => 0) : v.map((x) => x / n);
}

function cosine(a: number[], b: number[]): number {
  const na = l2(a);
  const nb = l2(b);
  return na < 1e-10 || nb < 1e-10 ? 0 : dot(a, b) / (na * nb);
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Deterministic integer hash (djb2 variant with seed). */
function hashStr(s: string, seed = 0): number {
  let h = seed;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}

/** Map a string into an n-dim vector in [−1, 1]. */
function hashVec(s: string, dims: number): number[] {
  const v: number[] = [];
  for (let d = 0; d < dims; d++) {
    const h = hashStr(s, d * 31337);
    v.push(((h & 0x7fffffff) / 0x7fffffff) * 2 - 1);
  }
  return v;
}

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────

export type InteractionType = keyof typeof INTERACTION_WEIGHTS;

type Interaction = {
  productId: string;
  type: InteractionType;
  timestamp: number;
};

export type RecommendationScore = {
  productId: string;
  contentScore: number;
  cfScore: number;
  socialScore: number;
  freshnessScore: number;
  diversityPenalty: number;
  finalScore: number;
  matchPercent: number;
};

// ────────────────────────────────────────────────────────────
// Product embedding  (ℝ³²)
// ────────────────────────────────────────────────────────────

function inferCategory(p: Product): string {
  const id = p.id.toLowerCase().replace(/__c\d+_\d+$/, ""); // strip cycle suffix
  for (const cat of Object.keys(CATEGORY_INDEX)) {
    if (id.startsWith(cat)) return cat;
  }
  const cats = Object.keys(CATEGORY_INDEX);
  return cats[Math.abs(hashStr(p.brand + p.title)) % cats.length];
}

/**
 * e_p ∈ ℝ³²
 *
 * Dims  0–14  category one-hot
 * Dim   15    price tier  (log-normalised)
 * Dims  16–19 brand hash  (4-d)
 * Dim   20    rating      (normalised 0–1)
 * Dim   21    popularity  (log gummis)
 * Dim   22    social      (friend count)
 * Dims  23–31 text hash   (9-d)
 */
function productEmbedding(p: Product): number[] {
  const e = new Array<number>(EMBEDDING_DIM).fill(0);

  // Category one-hot (0–14)
  const catIdx = CATEGORY_INDEX[inferCategory(p)];
  if (catIdx !== undefined) e[catIdx] = 1.0;

  // Price tier (15) — log₁₀( avgCents / 100 ) mapped to [0, 1]
  const avg = (p.price.min + p.price.max) / 2;
  e[15] = Math.min(1, Math.log1p(avg / 100) / Math.log1p(5000));

  // Brand hash (16–19)
  const bh = hashVec(p.brand.toLowerCase(), 4);
  for (let i = 0; i < 4; i++) e[16 + i] = bh[i] * 0.5;

  // Rating (20)
  e[20] = p.rating ? p.rating.average / 5 : 0.5;

  // Popularity (21)
  e[21] = Math.min(1, Math.log1p(p.gummis) / Math.log1p(500_000));

  // Social proof (22)
  e[22] = Math.min(1, (p.gummiedByFriends?.length ?? 0) / 5);

  // Text features (23–31)
  const text = [p.title, p.description ?? "", ...p.topFeatures].join(" ").toLowerCase();
  const th = hashVec(text, 9);
  for (let i = 0; i < 9; i++) e[23 + i] = th[i] * 0.4;

  return normalize(e);
}

// ────────────────────────────────────────────────────────────
// Collaborative-filtering latent vector  (ℝ¹⁶)
// ────────────────────────────────────────────────────────────

/**
 * Simulated implicit-ALS latent factors.
 *
 * In production these would be learned by minimising
 *   Σ_{u,i} c_{ui} (p_{ui} − u_u^T v_i)²  +  λ(‖U‖² + ‖V‖²)
 *
 * Here we derive deterministic latent factors from product metadata
 * so the demo captures the *shape* of CF without a training loop.
 *
 * Dims  0–3   category cluster
 * Dims  4–7   price × quality interaction
 * Dims  8–11  brand cluster
 * Dims  12–15 text taste dimensions
 */
function cfVector(p: Product): number[] {
  const v = new Array<number>(CF_LATENT_DIM).fill(0);

  const ch = hashVec(inferCategory(p), 4);
  for (let i = 0; i < 4; i++) v[i] = ch[i];

  const avg = (p.price.min + p.price.max) / 2;
  const pq = Math.min(1, avg / 50_000);
  const q = p.rating ? p.rating.average / 5 : 0.5;
  v[4] = pq;
  v[5] = q;
  v[6] = pq * q;
  v[7] = Math.log1p(p.gummis) / 15;

  const bh = hashVec(p.brand, 4);
  for (let i = 0; i < 4; i++) v[8 + i] = bh[i] * 0.6;

  const th = hashVec(p.title + p.brand, 4);
  for (let i = 0; i < 4; i++) v[12 + i] = th[i] * 0.4;

  return normalize(v);
}

// ────────────────────────────────────────────────────────────
// User embedding
// ────────────────────────────────────────────────────────────

/** Exponential time-decay with configurable half-life. */
function decay(tsMs: number, nowMs: number): number {
  const days = (nowMs - tsMs) / 86_400_000;
  return Math.exp((-0.693 / TIME_DECAY_HALF_LIFE_DAYS) * days);
}

/**
 * User content embedding split into long-term and short-term.
 *
 *   û_long  = Σ_i w_i λ(t_i) ê_{p_i}  /  Σ_i |w_i| λ(t_i)
 *   û_short = Σ_{i∈session} w_i ê_{p_i}  /  Σ |w_i|
 *   û       = β û_long + (1−β) û_short     (then L2-normalised)
 */
function userEmbedding(
  interactions: Interaction[],
  embeddings: Map<string, number[]>,
  now: number,
): { longTerm: number[]; shortTerm: number[]; combined: number[] } {
  const lt = new Array<number>(EMBEDDING_DIM).fill(0);
  let ltW = 0;

  for (const ix of interactions) {
    const e = embeddings.get(ix.productId);
    if (!e) continue;
    const w = INTERACTION_WEIGHTS[ix.type];
    const d = decay(ix.timestamp, now);
    const ew = w * d;
    for (let k = 0; k < EMBEDDING_DIM; k++) lt[k] += ew * e[k];
    ltW += Math.abs(ew);
  }
  if (ltW > 0) for (let k = 0; k < EMBEDDING_DIM; k++) lt[k] /= ltW;

  const session = interactions.slice(-SESSION_WINDOW);
  const st = new Array<number>(EMBEDDING_DIM).fill(0);
  let stW = 0;
  for (const ix of session) {
    const e = embeddings.get(ix.productId);
    if (!e) continue;
    const w = INTERACTION_WEIGHTS[ix.type];
    for (let k = 0; k < EMBEDDING_DIM; k++) st[k] += w * e[k];
    stW += Math.abs(w);
  }
  if (stW > 0) for (let k = 0; k < EMBEDDING_DIM; k++) st[k] /= stW;

  const c = new Array<number>(EMBEDDING_DIM).fill(0);
  for (let k = 0; k < EMBEDDING_DIM; k++) {
    c[k] = LONG_SHORT_BLEND * lt[k] + (1 - LONG_SHORT_BLEND) * st[k];
  }

  return { longTerm: normalize(lt), shortTerm: normalize(st), combined: normalize(c) };
}

/** User CF vector — time-decayed weighted average of item CF vectors. */
function userCFVector(
  interactions: Interaction[],
  cfVecs: Map<string, number[]>,
  now: number,
): number[] {
  const v = new Array<number>(CF_LATENT_DIM).fill(0);
  let wSum = 0;
  for (const ix of interactions) {
    const cf = cfVecs.get(ix.productId);
    if (!cf) continue;
    const w = INTERACTION_WEIGHTS[ix.type] * decay(ix.timestamp, now);
    for (let k = 0; k < CF_LATENT_DIM; k++) v[k] += w * cf[k];
    wSum += Math.abs(w);
  }
  if (wSum > 0) for (let k = 0; k < CF_LATENT_DIM; k++) v[k] /= wSum;
  return normalize(v);
}

// ────────────────────────────────────────────────────────────
// Retrieval  (stage 1)
// ────────────────────────────────────────────────────────────

function retrieve(
  uEmb: number[],
  items: { id: string; emb: number[] }[],
  topK: number,
): { id: string; score: number }[] {
  const scored = items.map((it) => ({ id: it.id, score: cosine(uEmb, it.emb) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

// ────────────────────────────────────────────────────────────
// Reranking  (stage 2)
// ────────────────────────────────────────────────────────────

/**
 * s_final(u, p) =  w₁ · s_content
 *                + w₂ · s_cf
 *                + w₃ · s_social
 *                + w₄ · s_fresh
 *                − w₅ · d_diversity
 */
function rerank(
  candidates: { id: string; score: number }[],
  uCF: number[],
  cfVecs: Map<string, number[]>,
  products: Map<string, Product>,
  embeddings: Map<string, number[]>,
  maxGummis: number,
): RecommendationScore[] {
  const selected: number[][] = [];

  return candidates.map((c) => {
    const p = products.get(c.id);
    const cf = cfVecs.get(c.id);
    const emb = embeddings.get(c.id);

    const contentScore = c.score;
    const cfScore = cf ? cosine(uCF, cf) : 0;

    const friends = p?.gummiedByFriends?.length ?? 0;
    const socialScore = Math.min(1, friends / 4) * 0.7 + (friends > 0 ? 0.3 : 0);

    const freshnessScore = maxGummis > 0
      ? Math.min(1, (p?.gummis ?? 0) / (maxGummis * 0.3))
      : 0;

    let diversityPenalty = 0;
    if (emb && selected.length > 0) {
      let mx = 0;
      for (const s of selected) mx = Math.max(mx, cosine(emb, s));
      diversityPenalty = mx;
    }
    if (emb) selected.push(emb);

    const finalScore =
      RANK_WEIGHTS.content * contentScore +
      RANK_WEIGHTS.collaborative * cfScore +
      RANK_WEIGHTS.social * socialScore +
      RANK_WEIGHTS.freshness * freshnessScore -
      RANK_WEIGHTS.diversity * diversityPenalty;

    return {
      productId: c.id,
      contentScore,
      cfScore,
      socialScore,
      freshnessScore,
      diversityPenalty,
      finalScore,
      matchPercent: 0,
    };
  });
}

// ────────────────────────────────────────────────────────────
// Score normalisation  →  display range [65, 98]
// ────────────────────────────────────────────────────────────

/**
 * match% = 65 + 30 · σ( 4(s − μ) / σ_s )
 *
 * Maps the raw score distribution into a friendly percentage where
 * every visible product sits between 65 % and 98 %, with strong
 * matches clearly differentiated from weaker ones.
 */
function normalizeToDisplay(scores: RecommendationScore[]): RecommendationScore[] {
  if (scores.length === 0) return scores;
  const vals = scores.map((s) => s.finalScore);
  const mu = vals.reduce((a, b) => a + b, 0) / vals.length;
  const sigma = Math.sqrt(vals.reduce((a, b) => a + (b - mu) ** 2, 0) / vals.length) || 1;
  return scores.map((s) => ({
    ...s,
    matchPercent: Math.min(98, Math.max(65, Math.round(65 + 30 * sigmoid((4 * (s.finalScore - mu)) / sigma)))),
  }));
}

// ────────────────────────────────────────────────────────────
// Engine class
// ────────────────────────────────────────────────────────────

export class RecommendationEngine {
  private embMap = new Map<string, number[]>();
  private cfMap = new Map<string, number[]>();
  private prodMap = new Map<string, Product>();
  private interactions: Interaction[] = [];
  private ready = false;

  /** Index the full product catalogue — call once. */
  initialize(products: Product[]): void {
    for (const p of products) {
      const baseId = p.id.replace(/__c\d+_\d+$/, "");
      if (this.prodMap.has(baseId)) continue; // skip cycle dupes
      this.prodMap.set(p.id, p);
      this.embMap.set(p.id, productEmbedding(p));
      this.cfMap.set(p.id, cfVector(p));
    }
    this.ready = true;
  }

  /** Ensure a cycled product ID resolves to a known embedding. */
  private resolve(id: string): string | undefined {
    if (this.embMap.has(id)) return id;
    const base = id.replace(/__c\d+_\d+$/, "");
    if (this.embMap.has(base)) return base;
    return undefined;
  }

  /** Record a new user interaction. */
  recordInteraction(productId: string, type: InteractionType): void {
    const resolved = this.resolve(productId) ?? productId;
    this.interactions.push({ productId: resolved, type, timestamp: Date.now() });
  }

  /**
   * Seed historical behaviour (gummied / saved / wishlisted product IDs).
   * Spreads interactions across the past to simulate real history.
   */
  seedUserBehavior(b: { gummied: string[]; saved: string[]; wishlisted: string[] }): void {
    const now = Date.now();
    const DAY = 86_400_000;

    const push = (ids: string[], type: InteractionType, spreadDays: number) => {
      ids.forEach((raw, i) => {
        const id = this.resolve(raw) ?? raw;
        this.interactions.push({
          productId: id,
          type,
          timestamp: now - (ids.length - i) * (spreadDays / ids.length) * DAY,
        });
      });
    };

    push(b.gummied, "purchase", 90);
    push(b.saved, "save", 60);
    push(b.wishlisted, "wishlist", 45);
  }

  /**
   * Score a list of candidate product IDs.
   * Returns Map<productId, matchPercent ∈ [65, 98]>.
   */
  score(candidateIds: string[]): Map<string, number> {
    if (!this.ready || this.interactions.length === 0) return new Map();

    const now = Date.now();

    // Resolve IDs and build candidate list
    const resolved: { original: string; resolved: string }[] = [];
    for (const id of candidateIds) {
      const r = this.resolve(id);
      if (r) resolved.push({ original: id, resolved: r });
    }

    // User vectors
    const uEmb = userEmbedding(this.interactions, this.embMap, now);
    const uCF = userCFVector(this.interactions, this.cfMap, now);

    // Stage 1 — retrieval by content similarity
    const items = resolved.map((r) => ({ id: r.resolved, emb: this.embMap.get(r.resolved)! }));
    const retrieved = retrieve(uEmb.combined, items, items.length);

    // Max gummis for freshness normalisation
    let maxG = 0;
    for (const r of resolved) {
      const p = this.prodMap.get(r.resolved);
      if (p) maxG = Math.max(maxG, p.gummis);
    }

    // Stage 2 — rerank
    const ranked = rerank(retrieved, uCF, this.cfMap, this.prodMap, this.embMap, maxG);
    const normed = normalizeToDisplay(ranked);

    // Build result map with original (possibly cycled) IDs
    const idToResolved = new Map(resolved.map((r) => [r.resolved, r.original]));
    const result = new Map<string, number>();
    for (const s of normed) {
      const origId = idToResolved.get(s.productId) ?? s.productId;
      result.set(origId, s.matchPercent);
    }
    return result;
  }
}

/** Singleton — shared across the app. */
export const recommendationEngine = new RecommendationEngine();
