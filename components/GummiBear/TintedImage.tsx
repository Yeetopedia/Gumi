"use client";

import { useState, useEffect } from "react";
import { shiftHue } from "@/lib/hue-shift";

type TintedImageProps = {
  src: string;
  hue: number;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
};

export default function TintedImage({
  src,
  hue,
  width,
  height,
  fill = false,
  className = "",
  style,
  alt = "",
}: TintedImageProps) {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const needsShift = normalizedHue !== 0;
  const [tintedSrc, setTintedSrc] = useState<string | null>(needsShift ? null : src);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!needsShift) {
      setTintedSrc(src);
      return;
    }

    let cancelled = false;
    shiftHue(src, normalizedHue).then((dataUrl) => {
      if (!cancelled) setTintedSrc(dataUrl);
    });

    return () => {
      cancelled = true;
    };
  }, [src, normalizedHue, needsShift, mounted]);

  // For non-shifted images, show immediately. For shifted, fade in when ready.
  const isReady = !!tintedSrc;
  const displaySrc = tintedSrc || src;

  const fadeStyle: React.CSSProperties = {
    ...style,
    opacity: isReady ? 1 : 0,
    transition: "opacity 0.3s ease-in",
  };

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={displaySrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain ${className}`}
        style={fadeStyle}
        draggable={false}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={fadeStyle}
      draggable={false}
    />
  );
}
