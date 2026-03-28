# Gumi — Full Project Context

## What is Gumi
Social commerce app — Instagram-style feed of products, but social proof is purchase-based ("Gumi" = bought this). Friends' purchases drive the feed algorithm. Tagline: buy what your circle actually buys.

Built for a hackathon. Current state: fully functional frontend with mock data, no real auth or purchases.

---

## Tech Stack
- **Next.js 15** (App Router, Turbopack)
- **React 19**, TypeScript 5
- **Tailwind CSS 4**, Framer Motion (animations)
- **Fonts**: Cormorant Garamond (headings), DM Sans (body)
- **Colors**: cream bg `#FAFAF8`, accent `#C45D3E` (rust/burnt orange)

---

## Running the App
```bash
cd C:\Users\shour\Gumi
npm install       # first time only
npm run dev       # starts at localhost:3000 (or 3001 if port taken)
```

---

## File Structure

```
app/
  page.tsx                    ← main feed page (client component)
  layout.tsx
  globals.css
  product/[id]/page.tsx       ← full product detail page (added recently)
  api/
    feed/route.ts             ← GET /api/feed?category=&cursor=&limit=
    search/route.ts           ← GET /api/search?q=&cursor=&limit=
    product/[id]/route.ts     ← GET /api/product/[id]
    ai/                       ← DELETED (was Lava integration, see below)

components/
  Sidebar.tsx                 ← left sidebar: logo, search, categories, feed mode toggle, profile
  TopNav.tsx                  ← old top nav (still exists but replaced by Sidebar in page.tsx)
  StoriesRow.tsx              ← friend story avatars with ring
  StoryViewer.tsx             ← full-screen story carousel
  MasonryGrid.tsx             ← CSS masonry wrapper → ProductCard
  ProductCard.tsx             ← individual card with Gumi, share, friend avatars
  ProductModal.tsx            ← side drawer product detail (used in Reels mode)
  ReelsView.tsx               ← TikTok-style vertical scroll
  UserProfile.tsx             ← friend profile drawer (slides from right)
  AlgorithmModal.tsx          ← algorithm visualization modal
  ImageGallery.tsx
  GumiBadge.tsx
  GumiToast.tsx               ← bottom toast on Gumi action
  SkeletonCard.tsx
  SearchBar.tsx
  CategoryPills.tsx           ← (legacy, now in Sidebar)
  MyProfile/
    MyProfile.tsx             ← current user profile modal
    ProfileHeader.tsx
    ProfileTabs.tsx           ← tabs: Gumis / Saved / Collections / Wishlist
    ProfileGumisGrid.tsx
    ProfileSavedGrid.tsx
    ProfileCollections.tsx
    ProfileCollectionDetail.tsx
    ProfileWishlist.tsx
    ProfileHighlights.tsx
    HighlightViewer.tsx
    ProfileProductGrid.tsx
    ProfileSortFilter.tsx
    EditProfileModal.tsx
    SettingsPanel.tsx
    UserListModal.tsx         ← followers/following list

lib/
  shopify-catalog.ts          ← Shopify Discover API client (uses mock data if no env vars)
  mock-data.ts                ← CATEGORIES array, imports ALL_PRODUCTS from mock-products/
  mock-products/
    index.ts                  ← aggregates all categories
    fashion.ts, shoes.ts, bags-accessories.ts, jewelry.ts
    home.ts, kitchen.ts, beauty.ts, fragrance.ts
    art.ts, tech.ts, outdoors.ts, wellness.ts
    books-stationery.ts, food-drink.ts, plants.ts
  mock-users.ts               ← 12 mock friends + CURRENT_USER (Tyler)
  current-user-data.ts        ← getCurrentUserProfile(), getMyGumis(), getMySavedProducts(), getMyCollections(), getMyWishlist()
  user-products.ts            ← getUserGumis(), getUserHighlights() (deterministic per userId)
  utils.ts                    ← formatPriceRange(), formatCount(), cn()

hooks/
  useDebounce.ts              ← 300ms debounce
  useInfiniteScroll.ts        ← IntersectionObserver-based infinite scroll

types/index.ts                ← Product, MockUser, FeedResponse, Category, FeedMode,
                                 CurrentUserProfile, Collection, ProfileTab, SortOption
```

---

## Current App Layout (post-refactor)

The layout changed from a top nav to a **left sidebar**:
- `page.tsx` renders `<Sidebar />` + `<div className="flex-1">` for content
- Gallery mode: clicking a product card navigates to `/product/${id}` (full page, not modal)
- Reels mode: clicking opens `ProductModal` overlay
- `MyProfile` opens as a modal over the page (triggered by Sidebar profile icon)

---

## Data Flow

**Products (mock mode, default):**
- `USE_MOCK_DATA = !process.env.SHOPIFY_CATALOG_CLIENT_ID`
- 15 mock categories, each with ~20-30 products = ~300+ total mock products
- Each product gets random `gumis` (50–500k), `shares`, and 0–3 `gumiedByFriends` user IDs per request

**Current user:**
- Name: Tyler (from `CURRENT_USER` in `mock-users.ts`)
- `current-user-data.ts` exposes profile data, saved/wishlist/collections

**Friend users:**
- 12 mock users in `MOCK_USERS`, all with Unsplash avatars
- 9 of 12 have `hasStory: true`

---

## Categories (17 total)
`for-you`, `fashion`, `shoes`, `bags`, `jewelry`, `home`, `kitchen`, `beauty`, `fragrance`, `art`, `tech`, `outdoors`, `wellness`, `books`, `food`, `plants`, and a few more in mock-products/

---

## Product Detail Page (`/product/[id]`)
- Full page (not modal) in gallery mode
- Reads from `MOCK_PRODUCTS` directly by ID
- Shows image gallery, Gumi button, save button, related products grid (infinite scroll)
- Back button → router.back()

---

## Lava AI Integration — STATUS: NOT CURRENTLY IN CODE (deleted)

### What Was Built (and then removed)
All files were created and tested, then deleted. Here is everything needed to re-add it:

### Lava Gateway Info
- **Company**: Lava (lavapayments.com) — API gateway + billing platform
- **MCP package**: `npx -y @lavapayments/mcp` (run via `claude mcp add lava -- npx -y @lavapayments/mcp`)
- **API key location**: `.env.local` → `LAVA_API_KEY=aks_live_...`
- **Gateway URL format** (confirmed working):
  ```
  POST https://api.lava.so/v1/forward?u={URL-encoded provider URL}
  Authorization: Bearer {LAVA_API_KEY}
  Content-Type: application/json
  {body passes through to provider}
  ```
- **AI provider used**: Groq (`https://api.groq.com/openai/v1/chat/completions`)
  - Model: `llama-3.1-8b-instant` (fast, cheap)
  - Lava auto-injects the stored Groq credential — no separate Groq key needed
  - Must pass `"stream": false` in body

### Feature 1: "Why This?" Card Tags
Each product card shows a micro-caption like *"Our fave crew necks for effortless weekend style"*

**Files to create:**
`lib/lava.ts`:
```ts
const LAVA_BASE = "https://api.lava.so";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";

type Message = { role: "system" | "user" | "assistant"; content: string };

async function lavaChat(messages: Message[], maxTokens = 150): Promise<string | null> {
  const key = process.env.LAVA_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `${LAVA_BASE}/v1/forward?u=${encodeURIComponent(GROQ_CHAT_URL)}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: MODEL, messages, max_tokens: maxTokens, stream: false }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ?? null;
  } catch { return null; }
}

export type ProductHint = { id: string; title: string; brand: string; friendNames: string[] };

export async function getProductReasons(products: ProductHint[]): Promise<Record<string, string>> {
  if (products.length === 0) return {};
  const capped = products.slice(0, 15);
  const list = capped.map((p, i) => {
    const friends = p.friendNames.slice(0, 2).join(" and ");
    return `${i + 1}. "${p.title}" by ${p.brand}${friends ? ` (${friends} bought it)` : ""}`;
  }).join("\n");
  const result = await lavaChat([
    { role: "system", content: 'Write 8-word max social commerce micro-captions per product. Sound human. Return ONLY JSON: {"1":"reason","2":"reason"}' },
    { role: "user", content: list },
  ], 600);
  if (!result) return {};
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return {};
    const parsed = JSON.parse(jsonMatch[0]);
    const reasons: Record<string, string> = {};
    capped.forEach((p, i) => { const r = parsed[String(i + 1)]; if (typeof r === "string") reasons[p.id] = r; });
    return reasons;
  } catch { return {}; }
}

export async function expandSearchQuery(query: string): Promise<string> {
  const result = await lavaChat([
    { role: "system", content: "Rewrite shopping queries as product keywords. Return only keywords, max 6 words." },
    { role: "user", content: query },
  ], 30);
  return result || query;
}

export async function getProfileSummary(userName: string, productTitles: string[]): Promise<string | null> {
  return lavaChat([
    { role: "system", content: "Write a 1-sentence taste profile for a social commerce user. Be specific. Sound human, max 20 words." },
    { role: "user", content: `${userName.split(" ")[0]} has bought: ${productTitles.slice(0, 8).join(", ")}` },
  ], 80);
}
```

`app/api/ai/reasons/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { getProductReasons, ProductHint } from "@/lib/lava";
import { getUserById } from "@/lib/mock-users";

export async function POST(request: NextRequest) {
  const { products } = await request.json();
  const hints: ProductHint[] = products.map((p: { id: string; title: string; brand: string; gumiedByFriends?: string[] }) => ({
    id: p.id, title: p.title, brand: p.brand,
    friendNames: (p.gumiedByFriends ?? []).map((id: string) => getUserById(id)?.name ?? "").filter(Boolean),
  }));
  return NextResponse.json(await getProductReasons(hints));
}
```

`app/api/ai/profile/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { getProfileSummary } from "@/lib/lava";

export async function POST(request: NextRequest) {
  const { userName, productTitles } = await request.json();
  return NextResponse.json({ summary: await getProfileSummary(userName, productTitles) });
}
```

**Changes to existing files:**

`app/api/search/route.ts` — add 2 lines:
```ts
import { expandSearchQuery } from "@/lib/lava";
// ...
const expandedQuery = await expandSearchQuery(q);
const result = await searchProducts({ query: expandedQuery, cursor, limit });
```

`components/ProductCard.tsx` — add optional prop + UI:
```ts
// Add to type: aiReason?: string
// Add to function params: aiReason
// Add above price div:
{aiReason && (
  <p className="text-[10px] text-[var(--accent)] mb-1 italic line-clamp-1">✦ {aiReason}</p>
)}
```

`components/MasonryGrid.tsx` — add optional prop:
```ts
// Add to type: aiReasons?: Record<string, string>
// Add to destructure: aiReasons
// Add to ProductCard: aiReason={aiReasons?.[product.id]}
```

`components/UserProfile.tsx` — add state + fetch + UI:
```ts
const [aiSummary, setAiSummary] = useState<string | null>(null);
useEffect(() => {
  setAiSummary(null);
  if (!user || userGumis.length === 0) return;
  fetch("/api/ai/profile", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user.name, productTitles: userGumis.map((p) => p.title) }),
  }).then(r => r.json()).then(d => setAiSummary(d.summary ?? null)).catch(() => {});
}, [user?.id]);
// Add below bio:
{aiSummary && <p className="text-xs text-[var(--accent)] text-center max-w-xs mb-4 italic">✦ {aiSummary}</p>}
```

`app/page.tsx` — add state + fetch + pass to MasonryGrid:
```ts
const [aiReasons, setAiReasons] = useState<Record<string, string>>({});
// After setProducts(data.products) in fetchProductsFresh:
setAiReasons({});
fetch("/api/ai/reasons", {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ products: data.products.map(p => ({ id: p.id, title: p.title, brand: p.brand, gumiedByFriends: p.gumiedByFriends })) }),
}).then(r => r.json()).then(reasons => setAiReasons(reasons)).catch(() => {});
// Pass to MasonryGrid: aiReasons={aiReasons}
```

### Lava MCP Bonus Prize Context
Lava wants an MCP server exposing Gumi as AI-callable tools. The existing API routes already work:
- `get_feed` → wraps `/api/feed`
- `search_products` → wraps `/api/search`
- `get_product` → wraps `/api/product/[id]`
- `get_friend_activity` → returns mock friend Gumi history

Demo pitch: "What should I buy my friend Marcus for his birthday based on what he's Gumied?"

---

## Environment Variables
File: `.env.local` (gitignored, exists at project root)
```
LAVA_API_KEY=aks_live_...    ← spend key with Groq credential stored in Lava account
# Optional (not currently set):
SHOPIFY_CATALOG_CLIENT_ID=
SHOPIFY_CATALOG_CLIENT_SECRET=
```

Without `SHOPIFY_CATALOG_CLIENT_ID`, the app runs entirely on mock data.

---

## Key Design Decisions
- **"Gumi"** replaces "like" — it means "I bought this" (purchase-based social proof)
- **Gallery mode** → product click navigates to `/product/[id]` full page
- **Reels mode** → product click opens overlay modal
- All Lava/AI logic should stay in `lib/lava.ts` for easy removal
- All AI calls fail gracefully (silent fallback, 5s timeout)
- Mock data is deterministic per userId (same friend always buys the same products)
