"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProductImage } from "@/types";

type ImageGalleryProps = {
  images: ProductImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > currentIndex ? 1 : -1));
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const prev = useCallback(
    () => goTo(currentIndex === 0 ? images.length - 1 : currentIndex - 1, -1),
    [currentIndex, images.length, goTo]
  );

  const next = useCallback(
    () => goTo(currentIndex === images.length - 1 ? 0 : currentIndex + 1, 1),
    [currentIndex, images.length, goTo]
  );

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    if (images.length <= 1) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, images.length]);

  if (images.length === 0) return null;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative w-full bg-(--bg-secondary) rounded-xl overflow-hidden">
      <div className="relative aspect-square">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Dots - positioned at bottom of image */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-white w-4"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
