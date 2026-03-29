"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type AlgorithmModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Interaction signal weights (normalised to max 100 for bar display)
const SIGNALS = [
  { label: "Purchase (Gummi)", raw: "6.0", weight: 100, color: "var(--accent)" },
  { label: "Wishlist add", raw: "4.5", weight: 75, color: "var(--accent)" },
  { label: "Share", raw: "4.0", weight: 67, color: "var(--accent)" },
  { label: "Save / bookmark", raw: "3.0", weight: 50, color: "var(--text-tertiary)" },
  { label: "Extended dwell time", raw: "2.0", weight: 33, color: "var(--text-tertiary)" },
  { label: "Click / tap", raw: "1.5", weight: 25, color: "var(--border)" },
  { label: "View impression", raw: "1.0", weight: 17, color: "var(--border)" },
];

const RANK_WEIGHTS = [
  { symbol: "w\u2081", value: "0.35", label: "Content", desc: "Cosine similarity of user & item embeddings" },
  { symbol: "w\u2082", value: "0.25", label: "Collaborative", desc: "Latent-factor taste alignment (CF)" },
  { symbol: "w\u2083", value: "0.15", label: "Social", desc: "Friend purchase & wishlist signal" },
  { symbol: "w\u2084", value: "0.10", label: "Freshness", desc: "Trending velocity and recency" },
  { symbol: "w\u2085", value: "0.15", label: "Diversity", desc: "MMR penalty for redundant results" },
];

const PARAMS = [
  { symbol: "\u03B2", value: "0.60", label: "Long-term Blend", desc: "Weight of historical vs. session preference" },
  { symbol: "\u03C4", value: "7d", label: "Time Decay", desc: "Half-life for behavior signal decay" },
  { symbol: "d", value: "32+16", label: "Latent Dims", desc: "Content embedding + CF factor dimensions" },
];

// Embedding-space product clusters for the interactive visualization
const CLUSTER_DATA = [
  {
    label: "P\u2081", name: "Fashion cluster", similarity: "96%",
    rec: "Cashmere Crew Neck Sweater", recBrand: "Naadam",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=120&q=60",
  },
  {
    label: "P\u2082", name: "Home cluster", similarity: "91%",
    rec: "Hand-Thrown Ceramic Vase", recBrand: "East Fork",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=60",
  },
  {
    label: "P\u2083", name: "Beauty cluster", similarity: "87%",
    rec: "Botanical Face Oil", recBrand: "Herbivore",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=120&q=60",
  },
];

export default function AlgorithmModal({ isOpen, onClose }: AlgorithmModalProps) {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedCluster !== null) { setSelectedCluster(null); return; }
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, selectedCluster]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 bg-(--card-bg) rounded-2xl z-50 overflow-y-auto shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-(--bg-secondary) flex items-center justify-center hover:bg-(--border) transition-colors z-20"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto px-6 md:px-10 py-12"
            >
              {/* Header */}
              <motion.div variants={fadeUp} className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Image src="/gummi-icon.png" alt="" width={32} height={55} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-(--text-tertiary) font-medium mb-2">
                  The Algorithm
                </p>
                <h2
                  className="text-3xl md:text-4xl text-(--text-primary) mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  Vector Embedding Recommendation Engine
                </h2>
                <p className="text-sm text-(--text-secondary) max-w-md mx-auto">
                  A two-stage retrieval + reranking pipeline that encodes every product and user into dense vector embeddings, then finds your strongest matches in latent space.
                </p>
              </motion.div>

              {/* ── Pipeline overview ── */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  Pipeline
                </p>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {[
                    { step: "1", label: "Embed", desc: "Products \u2192 \u211D\u00B3\u00B2" },
                    { step: "2", label: "Profile", desc: "User \u2192 \u211D\u00B3\u00B2" },
                    { step: "3", label: "Retrieve", desc: "cos(\u00FB, \u00EA)" },
                    { step: "4", label: "Rerank", desc: "5-signal score" },
                    { step: "5", label: "Display", desc: "65\u201398% match" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <div className="bg-(--bg-secondary) rounded-xl px-4 py-3 text-center min-w-[90px]">
                        <span className="text-[9px] uppercase tracking-widest text-(--text-tertiary) block mb-1">Stage {s.step}</span>
                        <span className="text-sm font-semibold text-(--text-primary) block">{s.label}</span>
                        <span className="text-[10px] text-(--text-tertiary)">{s.desc}</span>
                      </div>
                      {i < 4 && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2" className="shrink-0">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Core Scoring Formula ── */}
              <motion.div variants={fadeUp} className="bg-(--bg-secondary) rounded-2xl p-6 md:p-8 mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  Reranking Score
                </p>
                <div className="formula text-center py-4 text-base md:text-lg leading-relaxed">
                  <var>s</var><sub>final</sub>(<var>u</var>, <var>p</var>) =
                  <var> w</var><sub>1</sub>&middot;<span className="fn">content</span> +
                  <var> w</var><sub>2</sub>&middot;<span className="fn">cf</span> +
                  <var> w</var><sub>3</sub>&middot;<span className="fn">social</span> +
                  <var> w</var><sub>4</sub>&middot;<span className="fn">fresh</span> &minus;
                  <var> w</var><sub>5</sub>&middot;<span className="fn">diversity</span>
                </div>

                <div className="border-t border-(--border) pt-4 mt-4 space-y-3">
                  <div className="formula text-sm text-(--text-secondary)">
                    <span className="fn">content</span>(<var>u</var>, <var>p</var>) = cos(<var>&ucirc;</var>, <var>&ecirc;</var><sub>p</sub>)
                    &nbsp;&nbsp; where <var>&ucirc;</var> = &beta;&middot;<var>&ucirc;</var><sub>long</sub> + (1&minus;&beta;)&middot;<var>&ucirc;</var><sub>short</sub>
                  </div>
                  <div className="formula text-sm text-(--text-secondary)">
                    <span className="fn">cf</span>(<var>u</var>, <var>p</var>) = cos(<var>&ucirc;</var><sub>cf</sub>, <var>v&#x0302;</var><sub>p</sub>)
                    &nbsp;&nbsp; implicit ALS latent factors in &real;<sup>16</sup>
                  </div>
                  <div className="formula text-sm text-(--text-secondary)">
                    <span className="fn">diversity</span>(<var>p</var>, <var>S</var>) = max<sub>q&isin;S</sub> cos(<var>&ecirc;</var><sub>p</sub>, <var>&ecirc;</var><sub>q</sub>)
                    &nbsp;&nbsp; MMR penalty
                  </div>
                </div>
              </motion.div>

              {/* ── User embedding formula ── */}
              <motion.div variants={fadeUp} className="bg-(--bg-secondary) rounded-2xl p-6 md:p-8 mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  User Embedding &mdash; Long-term + Short-term
                </p>
                <div className="space-y-3">
                  <div className="formula text-sm text-(--text-secondary)">
                    <var>&ucirc;</var><sub>long</sub> = &Sigma;<sub>i</sub> <var>w</var><sub>i</sub>&middot;&lambda;(<var>t</var><sub>i</sub>)&middot;<var>&ecirc;</var><sub>p<sub>i</sub></sub> &frasl; &Sigma;<sub>i</sub> |<var>w</var><sub>i</sub>|&middot;&lambda;(<var>t</var><sub>i</sub>)
                  </div>
                  <div className="formula text-sm text-(--text-secondary)">
                    <var>&ucirc;</var><sub>short</sub> = &Sigma;<sub>i&isin;session</sub> <var>w</var><sub>i</sub>&middot;<var>&ecirc;</var><sub>p<sub>i</sub></sub> &frasl; &Sigma; |<var>w</var><sub>i</sub>|
                    &nbsp;&nbsp; (last 20 interactions)
                  </div>
                  <div className="formula text-sm text-(--text-secondary)">
                    &lambda;(<var>t</var>) = exp(&minus;ln2 &frasl; &tau; &middot; &Delta;<var>t</var><sub>days</sub>)
                    &nbsp;&nbsp; exponential decay, &tau; = 7 days
                  </div>
                </div>
              </motion.div>

              {/* ── Latent Space Visualization ── */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-2">
                  Embedding Space
                </p>
                <h3
                  className="text-xl text-(--text-primary) mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  Nearest Neighbors in Latent Space
                </h3>
                <p className="text-sm text-(--text-secondary) mb-4 leading-relaxed">
                  Every product and user maps to a point in a 32-dimensional embedding space. At retrieval time, the engine finds products closest to your combined preference vector using cosine similarity &mdash; surfacing items that match both your long-term taste and current session.
                </p>
                <p className="text-xs text-(--text-tertiary) mb-6 italic">
                  Click P&#x2081;, P&#x2082;, or P&#x2083; to see how each cluster connects to you
                </p>

                {/* Visual: embedding space diagram */}
                <div className="bg-(--bg-secondary) rounded-2xl p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-square">
                    {/* Central user node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-(--accent) flex items-center justify-center text-white text-[9px] font-bold z-10 shadow-lg"
                    >
                      <span>&ucirc;</span>
                    </motion.div>

                    {/* Product cluster nodes */}
                    {[
                      { x: "22%", y: "22%", label: "P\u2081", delay: 0.4, idx: 0 },
                      { x: "78%", y: "18%", label: "P\u2082", delay: 0.5, idx: 1 },
                      { x: "76%", y: "68%", label: "P\u2083", delay: 0.6, idx: 2 },
                      { x: "18%", y: "72%", label: "\u00B7", delay: 0.7, idx: -1 },
                      { x: "58%", y: "82%", label: "\u00B7", delay: 0.8, idx: -1 },
                      { x: "38%", y: "12%", label: "\u00B7", delay: 0.9, idx: -1 },
                      { x: "88%", y: "42%", label: "\u00B7", delay: 1.0, idx: -1 },
                      { x: "10%", y: "48%", label: "\u00B7", delay: 1.1, idx: -1 },
                    ].map((node, i) => {
                      const isClickable = node.idx >= 0;
                      const isSelected = selectedCluster === node.idx;
                      return (
                        <motion.button
                          key={i}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: isSelected ? 1.2 : 1, opacity: 1 }}
                          transition={{ delay: node.delay, type: "spring", stiffness: 200 }}
                          onClick={() => isClickable ? setSelectedCluster(isSelected ? null : node.idx) : undefined}
                          className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${
                            isClickable
                              ? isSelected
                                ? "bg-(--accent) text-white shadow-lg ring-2 ring-(--accent)/40 cursor-pointer"
                                : "bg-(--accent)/20 text-(--accent) border border-(--accent)/30 cursor-pointer hover:bg-(--accent)/30"
                              : "bg-(--border) text-(--text-tertiary) cursor-default"
                          }`}
                          style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)", zIndex: isClickable ? 2 : 0 }}
                        >
                          {node.label}
                        </motion.button>
                      );
                    })}

                    {/* Connecting lines (SVG) — cosine similarity links */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                      {[
                        { x1: "50%", y1: "50%", x2: "22%", y2: "22%" },
                        { x1: "50%", y1: "50%", x2: "78%", y2: "18%" },
                        { x1: "50%", y1: "50%", x2: "76%", y2: "68%" },
                      ].map((line, i) => (
                        <motion.line
                          key={i}
                          x1={line.x1} y1={line.y1}
                          x2={line.x2} y2={line.y2}
                          stroke="var(--accent)"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          opacity="0.3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Cluster recommendation popup */}
              <AnimatePresence mode="wait">
                {selectedCluster !== null && CLUSTER_DATA[selectedCluster] && (
                  <motion.div
                    key={selectedCluster}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="mb-8 rounded-2xl bg-(--bg-secondary) border border-(--accent)/20 overflow-hidden"
                  >
                    <div className="flex items-stretch">
                      <div className="relative w-24 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={CLUSTER_DATA[selectedCluster].img}
                          alt={CLUSTER_DATA[selectedCluster].rec}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="w-5 h-5 rounded-full bg-(--accent)/20 text-(--accent) text-[9px] font-bold flex items-center justify-center">
                            {CLUSTER_DATA[selectedCluster].label}
                          </span>
                          <span className="text-xs font-medium text-(--text-primary)">{CLUSTER_DATA[selectedCluster].name}</span>
                          <span className="text-[10px] text-(--text-tertiary) ml-auto">{CLUSTER_DATA[selectedCluster].similarity} cosine</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-(--text-tertiary) mb-1">Nearest match in cluster</p>
                        <p className="text-sm font-semibold text-(--text-primary) leading-snug mb-0.5" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                          {CLUSTER_DATA[selectedCluster].rec}
                        </p>
                        <p className="text-xs text-(--text-tertiary)">
                          {CLUSTER_DATA[selectedCluster].recBrand}
                        </p>
                        <p className="text-[10px] text-(--text-tertiary) mt-1.5">
                          High content similarity + CF alignment with your taste vector
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Reranking Weight Cards ── */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  Reranking Weights
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {RANK_WEIGHTS.map((rw, i) => (
                    <motion.div
                      key={rw.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="bg-(--bg-secondary) rounded-xl p-3 text-center"
                    >
                      <span
                        className="text-lg text-(--accent) block mb-0.5"
                        style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
                      >
                        {rw.value}
                      </span>
                      <p className="text-[10px] font-semibold text-(--text-primary) mb-0.5">
                        {rw.label}
                      </p>
                      <p className="text-[9px] text-(--text-tertiary) leading-tight">
                        {rw.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── System Parameter Cards ── */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  System Parameters
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {PARAMS.map((param, i) => (
                    <motion.div
                      key={param.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-(--bg-secondary) rounded-xl p-4 text-center"
                    >
                      <span
                        className="text-2xl text-(--accent) block mb-1"
                        style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
                      >
                        {param.symbol} = {param.value}
                      </span>
                      <p className="text-xs font-semibold text-(--text-primary) mb-0.5">
                        {param.label}
                      </p>
                      <p className="text-[10px] text-(--text-tertiary)">
                        {param.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ── Interaction Signal Bars ── */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  Behavior Signal Weights
                </p>
                <div className="space-y-3">
                  {SIGNALS.map((signal, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-(--text-secondary)">{signal.label}</span>
                        <span className="text-xs text-(--text-tertiary) tabular-nums">{signal.raw}</span>
                      </div>
                      <div className="h-2 bg-(--bg-secondary) rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: signal.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${signal.weight}%` }}
                          transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Score Normalization ── */}
              <motion.div variants={fadeUp} className="bg-(--bg-secondary) rounded-2xl p-6 md:p-8 mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-(--text-tertiary) font-medium mb-4">
                  Score Normalization
                </p>
                <div className="formula text-center py-3 text-base md:text-lg">
                  match% = 65 + 30 &middot; &sigma;( 4 &middot; (<var>s</var> &minus; &mu;) / &sigma;<sub>s</sub> )
                </div>
                <p className="text-xs text-(--text-secondary) text-center mt-3 max-w-sm mx-auto leading-relaxed">
                  Raw scores are z-score normalized then sigmoid-mapped into the display range [65%, 98%], ensuring strong matches visually separate from weaker ones while every visible product feels like a positive recommendation.
                </p>
              </motion.div>

              {/* Footer */}
              <motion.div variants={fadeUp} className="text-center pt-4 border-t border-(--border)">
                <p className="text-xs text-(--text-tertiary)">
                  Every interaction shifts your preference vector in real time &mdash; click, save, or purchase to see your recommendations adapt.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
