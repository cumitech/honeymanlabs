import type { CSSProperties } from "react";

/** Shared honeycomb cell visuals (gallery, reviews). */

export const hexClipPath =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" as const;

export const hexClip = {
  clipPath: hexClipPath,
  WebkitClipPath: hexClipPath,
} as const;

/** Slightly softened pointy-top hex (matches reviews / gallery photo cells). */
export const softHexClipPath =
  "polygon(50% 1.5%, 97% 25%, 97% 75%, 50% 98.5%, 3% 75%, 3% 25%)" as const;

export const softHexClip = {
  clipPath: softHexClipPath,
  WebkitClipPath: softHexClipPath,
} as const;

/** Smooth multi-stop bezel + 3px rim (gold/bronze). */
export const HEX_RING =
  "p-[3px] [background:linear-gradient(168deg,#2c1f18_0%,#3d2e24_14%,#5c4332_32%,#7a5a3d_46%,#a67c45_54%,#c9a85c_60%,#8b6a3a_74%,#4a3628_88%,#32261e_100%)]";

export const hexDepthStyle: CSSProperties = {
  filter:
    "drop-shadow(0 1px 1px rgba(0,0,0,0.04)) drop-shadow(0 3px 8px rgba(35,26,18,0.09)) drop-shadow(0 8px 20px rgba(35,26,18,0.05))",
};
