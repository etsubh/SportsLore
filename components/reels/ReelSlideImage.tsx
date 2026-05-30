"use client";

import { useState } from "react";

interface ReelSlideImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  hidden?: boolean;
}

/** Native img — bypasses Next.js image optimizer which 404s on many external URLs */
export default function ReelSlideImage({
  src,
  alt,
  className = "",
  priority = false,
  hidden = false,
}: ReelSlideImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={hidden || undefined}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
