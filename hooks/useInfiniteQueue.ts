"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Product } from "@/types";

type UseInfiniteQueueOptions = {
  batchSize?: number;
  prefetchAt?: number;
  initialDisplayCount?: number;
  resetKey?: string;
};

type UseInfiniteQueueReturn = {
  displayedProducts: Product[];
  isLoading: boolean;
  prefetchSentinelIndex: number;
  prefetchSentinelRef: (node: HTMLDivElement | null) => void;
  loadSentinelRef: (node: HTMLDivElement | null) => void;
  manualAppend: () => void;
};

// Fisher-Yates shuffle (truly random)
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function useInfiniteQueue(
  sourceProducts: Product[],
  options?: UseInfiniteQueueOptions
): UseInfiniteQueueReturn {
  const {
    batchSize = 500,
    prefetchAt = 200,
    initialDisplayCount = 30,
    resetKey = "",
  } = options ?? {};

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prefetchSentinelIndex, setPrefetchSentinelIndex] = useState(-1);

  const queueRef = useRef<Product[]>([]);
  const cycleRef = useRef(0);
  const bufferRef = useRef<Product[]>([]);
  const lastBatchStartRef = useRef(0);
  const prefetchSentinelNodeRef = useRef<HTMLDivElement | null>(null);
  const loadSentinelNodeRef = useRef<HTMLDivElement | null>(null);
  const isPrefetchingRef = useRef(false);
  const isInitializedRef = useRef(false);

  // Pull items from the queue, auto-reshuffling when exhausted
  const pullFromQueue = useCallback(
    (count: number): Product[] => {
      if (sourceProducts.length === 0) return [];

      const items: Product[] = [];
      while (items.length < count) {
        if (queueRef.current.length === 0) {
          // Reshuffle the full pool
          cycleRef.current += 1;
          queueRef.current = shuffle(sourceProducts);
        }
        const needed = count - items.length;
        const take = queueRef.current.splice(0, needed);
        const cycle = cycleRef.current;
        const tagged =
          cycle === 0
            ? take
            : take.map((p, i) => ({
                ...p,
                id: `${p.id}__c${cycle}_${items.length + i}`,
              }));
        items.push(...tagged);
      }
      return items;
    },
    [sourceProducts]
  );

  // Fill the buffer with the next batch
  const fillBuffer = useCallback(() => {
    if (isPrefetchingRef.current || bufferRef.current.length > 0) return;
    if (sourceProducts.length === 0) return;
    isPrefetchingRef.current = true;
    bufferRef.current = pullFromQueue(batchSize);
    isPrefetchingRef.current = false;
  }, [pullFromQueue, batchSize, sourceProducts.length]);

  // Append the buffer to displayed products
  const appendBuffer = useCallback(() => {
    if (bufferRef.current.length === 0) return;
    const batch = bufferRef.current;
    bufferRef.current = [];

    setDisplayedProducts((prev) => {
      const newStart = prev.length;
      lastBatchStartRef.current = newStart;
      setPrefetchSentinelIndex(newStart + prefetchAt);
      return [...prev, ...batch];
    });

    // Immediately start filling the next buffer
    fillBuffer();
  }, [fillBuffer, prefetchAt]);

  // Initialize / reset when resetKey or sourceProducts change
  useEffect(() => {
    if (sourceProducts.length === 0) {
      setDisplayedProducts([]);
      setIsLoading(false);
      bufferRef.current = [];
      queueRef.current = [];
      cycleRef.current = 0;
      isInitializedRef.current = true;
      return;
    }

    // Flush everything
    cycleRef.current = 0;
    bufferRef.current = [];
    isPrefetchingRef.current = false;
    queueRef.current = shuffle(sourceProducts);

    // Pull initial display items
    const initial = pullFromQueue(initialDisplayCount);
    setDisplayedProducts(initial);
    lastBatchStartRef.current = 0;
    setPrefetchSentinelIndex(prefetchAt);
    setIsLoading(false);

    // Fill the first buffer
    bufferRef.current = pullFromQueue(batchSize);
    isInitializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, sourceProducts.length]);

  // Load sentinel observer — appends buffer when bottom is reached
  const setLoadSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      loadSentinelNodeRef.current = node;
    },
    []
  );

  useEffect(() => {
    const node = loadSentinelNodeRef.current;
    if (!node || !isInitializedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          appendBuffer();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [appendBuffer, displayedProducts.length]);

  // Prefetch sentinel observer — fills buffer when scrolled to ~200th item of batch
  const setPrefetchSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      prefetchSentinelNodeRef.current = node;
    },
    []
  );

  useEffect(() => {
    const node = prefetchSentinelNodeRef.current;
    if (!node || !isInitializedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fillBuffer();
        }
      },
      { rootMargin: "0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fillBuffer, prefetchSentinelIndex]);

  // Manual append for ReelsView or other non-observer triggers
  const manualAppend = useCallback(() => {
    if (bufferRef.current.length === 0) {
      fillBuffer();
    }
    appendBuffer();
  }, [fillBuffer, appendBuffer]);

  return {
    displayedProducts,
    isLoading,
    prefetchSentinelIndex,
    prefetchSentinelRef: setPrefetchSentinelRef,
    loadSentinelRef: setLoadSentinelRef,
    manualAppend,
  };
}
