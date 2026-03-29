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
  const [tintedSrc, setTintedSrc] = useState<string>(src);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const normalizedHue = ((hue % 360) + 360) % 360;
    if (normalizedHue === 0) {
      setTintedSrc(src);
      setReady(true);
      return;
    }

    let cancelled = false;
    shiftHue(src, normalizedHue).then((dataUrl) => {
      if (!cancelled) {
        setTintedSrc(dataUrl);
        setReady(true);
      }
    });

    return () => { cancelled = true; };
  }, [src, hue]);

  // On server and initial client render, always show the original src.
  // Once the hue-shifted version is ready, swap it in with a fade.
  const needsShift = ((hue % 360) + 360) % 360 !== 0;
  const opacity = needsShift && !ready ? 0 : 1;

  const mergedStyle: React.CSSProperties = {
    ...style,
    opacity,
    transition: "opacity 0.3s ease-in",
  };

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={tintedSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain ${className}`}
        style={mergedStyle}
        draggable={false}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tintedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={mergedStyle}
      draggable={false}
    />
  );
}
