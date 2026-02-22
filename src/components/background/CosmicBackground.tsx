import { useEffect, useRef, memo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Lightweight shooting star via CSS-only approach
const ShootingStar = memo(function ShootingStar() {
  return (
    <>
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
    </>
  );
});

// Stars layer — static dots via CSS radial-gradient (no canvas)
const StarsLayer = memo(function StarsLayer() {
  return (
    <div className="cosmic-stars" aria-hidden="true">
      <div className="stars-small" />
      <div className="stars-medium" />
    </div>
  );
});

// Digital dust — very subtle floating particles via CSS
const DustLayer = memo(function DustLayer() {
  return <div className="cosmic-dust" aria-hidden="true" />;
});

export const CosmicBackground = memo(function CosmicBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="cosmic-bg-static" aria-hidden="true" />;
  }

  return (
    <div className="cosmic-background" aria-hidden="true">
      <StarsLayer />
      <DustLayer />
      <ShootingStar />
    </div>
  );
});
