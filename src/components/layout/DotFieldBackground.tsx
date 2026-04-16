"use client";

import { useMemo } from "react";

const DOT_COUNT = 280;

/** Deterministic PRNG so server and client render the same positions. */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function DotFieldBackground() {
  const dots = useMemo(() => {
    const rng = mulberry32(0xdecafbad);
    return Array.from({ length: DOT_COUNT }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      opacity: 0.14 + rng() * 0.22,
      duration: 12 + rng() * 24,
      delay: -rng() * 28,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d) => (
        <div
          key={d.id}
          className="pointer-events-auto absolute flex h-10 w-10 items-center justify-center [will-change:transform] hover:[&>span]:scale-[5]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            animation: `dot-wander ${d.duration}s ease-in-out infinite`,
            animationDelay: `${d.delay}s`,
          }}
        >
          <span
            className="block h-[3px] w-[3px] origin-center rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.25)] transition-transform duration-200 ease-out sm:h-1 sm:w-1"
            style={{ opacity: d.opacity }}
          />
        </div>
      ))}
    </div>
  );
}
