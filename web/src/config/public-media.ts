/**
 * Files under `public/images/`. Add keys here when new assets are committed so
 * layouts import paths from one place. Catalog content (`content/home.ts`, etc.)
 * may reference other `/images/...` paths—copy those files into `public/images`
 * or add entries below and point content at them.
 */
export const publicImages = {
  /** Decorative bee (landing / section accents). */
  brandBee: {
    src: "/images/bee.png",
    alt: "",
  },
  beekeeperField: {
    src: "/images/honey-bee-469560_1280.webp",
    alt: "Beekeeper at work in the field",
  },
  honeyJarCutout: {
    src: "/images/honey-8490746_1280-removebg-preview.png",
    alt: "Glass jar of honey",
  },
  heroAccentShape: {
    src: "/images/hero-bg-bottom-removebg-preview.png",
    alt: "",
  },
} as const;
