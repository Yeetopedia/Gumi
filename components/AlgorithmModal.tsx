"use client";

import { useEffect } from "react";
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

const SIGNALS = [
  { label: "Friend purchased this product", weight: 100, color: "var(--accent)" },
  { label: "Friend wishlisted this product", weight: 65, color: "var(--accent)" },
  { label: "Category matches user taste profile", weight: 45, color: "var(--text-tertiary)" },
  { label: "Product is trending (time-decayed Gumis)", weight: 35, color: "var(--text-tertiary)" },
  { label: "Price range matches user history", weight: 25, color: "var(--border)" },
];

const PARAMS = [
  { symbol: "α", value: "0.45", label: "Social Signal", desc: "Weight of friend purchase activity" },
  { symbol: "β", value: "0.35", label: "Personal Affinity", desc: "Cosine similarity of taste embeddings" },
  { symbol: "γ", value: "0.20", label: "Trending Score", desc: "Time-decayed purchase velocity" },
];

export default function AlgorithmModal({ isOpen, onClose }: AlgorithmModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

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
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 bg-[var(--card-bg)] rounded-2xl z-50 overflow-y-auto shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--border)] transition-colors z-20"
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
                  <Image src="/gumi-icon.png" alt="" width={32} height={32} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-medium mb-2">
                  The Algorithm
                </p>
                <h2
                  className="text-3xl md:text-4xl text-[var(--text-primary)] mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  Social Graph Recommendation Engine
                </h2>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  How Gumi surfaces products your friends actually bought — turning purchase behavior into personalized discovery.
                </p>
              </motion.div>

              {/* Core Formula */}
              <motion.div variants={fadeUp} className="bg-[var(--bg-secondary)] rounded-2xl p-6 md:p-8 mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-4">
                  Scoring Function
                </p>
                <div className="formula text-center py-4 text-lg md:text-xl">
                  <span className="fn">score</span>(<var>u</var>, <var>p</var>) = <var>α</var> · <span className="fn">social</span>(<var>u</var>, <var>p</var>) + <var>β</var> · <span className="fn">affinity</span>(<var>u</var>, <var>p</var>) + <var>γ</var> · <span className="fn">trend</span>(<var>p</var>)
                </div>
                <div className="border-t border-[var(--border)] pt-4 mt-4 space-y-3">
                  <div className="formula text-sm text-[var(--text-secondary)]">
                    <span className="fn">social</span>(<var>u</var>, <var>p</var>) = Σ <var>w</var>(<var>u</var>, <var>f</var><sub>i</sub>) · <span className="fn">gumi</span>(<var>f</var><sub>i</sub>, <var>p</var>)&nbsp;&nbsp; for <var>f</var><sub>i</sub> ∈ <span className="fn">friends</span>(<var>u</var>)
                  </div>
                  <div className="formula text-sm text-[var(--text-secondary)]">
                    <span className="fn">affinity</span>(<var>u</var>, <var>p</var>) = <span className="fn">cos</span>(<span className="fn">embed</span>(<var>u</var>), <span className="fn">embed</span>(<var>p</var>))
                  </div>
                  <div className="formula text-sm text-[var(--text-secondary)]">
                    <span className="fn">trend</span>(<var>p</var>) = <span className="fn">gumis</span>(<var>p</var>, <var>t</var>) / <span className="fn">decay</span>(<var>t</var>)
                  </div>
                </div>
              </motion.div>

              {/* k-Nearest Neighbors Section */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-2">
                  Stage 2
                </p>
                <h3
                  className="text-xl text-[var(--text-primary)] mb-3"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
                >
                  Finding Your Taste Neighbors
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                  We transform each user&apos;s Gumi history into a high-dimensional behavior vector. Using k-nearest neighbors (k-NN), we identify users with the most similar purchase patterns — your &quot;taste neighbors.&quot; Products purchased by your neighbors but not yet seen by you become high-confidence recommendations.
                </p>

                {/* Visual: user cluster diagram */}
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 flex items-center justify-center">
                  <div className="relative w-full max-w-xs aspect-square">
                    {/* Central user node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold z-10 shadow-lg"
                    >
                      You
                    </motion.div>

                    {/* Neighbor nodes */}
                    {[
                      { x: "20%", y: "25%", label: "N₁", delay: 0.4, accent: true },
                      { x: "75%", y: "20%", label: "N₂", delay: 0.5, accent: true },
                      { x: "80%", y: "65%", label: "N₃", delay: 0.6, accent: true },
                      { x: "15%", y: "70%", label: "N₄", delay: 0.7, accent: false },
                      { x: "60%", y: "80%", label: "N₅", delay: 0.8, accent: false },
                      { x: "35%", y: "15%", label: "·", delay: 0.9, accent: false },
                      { x: "90%", y: "40%", label: "·", delay: 1.0, accent: false },
                      { x: "8%", y: "45%", label: "·", delay: 1.1, accent: false },
                    ].map((node, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: node.delay, type: "spring", stiffness: 200 }}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium ${
                          node.accent
                            ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30"
                            : "bg-[var(--border)] text-[var(--text-tertiary)]"
                        }`}
                        style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
                      >
                        {node.label}
                      </motion.div>
                    ))}

                    {/* Connecting lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                      {[
                        { x1: "50%", y1: "50%", x2: "20%", y2: "25%" },
                        { x1: "50%", y1: "50%", x2: "75%", y2: "20%" },
                        { x1: "50%", y1: "50%", x2: "80%", y2: "65%" },
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

              {/* Parameter Cards */}
              <motion.div variants={fadeUp} className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-4">
                  Weight Parameters
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {PARAMS.map((param, i) => (
                    <motion.div
                      key={param.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-[var(--bg-secondary)] rounded-xl p-4 text-center"
                    >
                      <span
                        className="text-2xl text-[var(--accent)] block mb-1"
                        style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}
                      >
                        {param.symbol} = {param.value}
                      </span>
                      <p className="text-xs font-semibold text-[var(--text-primary)] mb-0.5">
                        {param.label}
                      </p>
                      <p className="text-[10px] text-[var(--text-tertiary)]">
                        {param.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Signal Strength Bars */}
              <motion.div variants={fadeUp} className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)] font-medium mb-4">
                  Signal Strength
                </p>
                <div className="space-y-3">
                  {SIGNALS.map((signal, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-secondary)]">{signal.label}</span>
                        <span className="text-xs text-[var(--text-tertiary)]">{signal.weight}%</span>
                      </div>
                      <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: signal.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${signal.weight}%` }}
                          transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div variants={fadeUp} className="text-center pt-4 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-tertiary)]">
                  The social graph turns every purchase into a signal that helps friends discover products they&apos;ll love.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
