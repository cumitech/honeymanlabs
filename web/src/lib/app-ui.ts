import { cn } from "@/lib/utils";

/** Standard focus ring using `--ring` (amber); use on links and custom interactive nodes. */
export const appFocusVisible = cn(
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
);

/** Filled inputs / selects on cream marketing surfaces (filters, newsletter, etc.). */
export const appControlFilled = cn(
  "h-11 w-full min-w-0 rounded-lg border border-[var(--foreground)]/12 bg-[var(--surface)] px-4 text-sm text-foreground",
  "shadow-xs transition-[color,box-shadow,border-color]",
  "placeholder:text-muted-foreground",
  "focus-visible:border-[var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]/40",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

/** Search field with leading icon (`pl-9` + icon absolutely positioned left). */
export const appControlFilledSearch = cn(appControlFilled, "pl-9 pr-3");

export const appControlFilledSelect = cn(
  appControlFilled,
  "cursor-pointer appearance-none bg-[var(--surface)] pr-9",
);

/** Editorial underline fields (contact). */
export const appControlUnderline = cn(
  "block w-full min-h-12 rounded-none border-0 border-b-2 border-border bg-transparent px-0 py-3",
  "font-sans text-base text-foreground outline-none transition-[border-color,box-shadow]",
  "placeholder:text-muted-foreground/45",
  "focus-visible:border-primary focus-visible:ring-0",
);

/** Partner-style underline fields on a soft tint. */
export const appControlUnderlineTinted = cn(
  "h-12 w-full rounded-none border-0 border-b-2 border-border bg-[var(--surface-container-low)] px-2",
  "font-sans text-foreground outline-none transition-colors",
  "focus-visible:border-primary focus-visible:ring-0",
  "placeholder:text-muted-foreground",
);

/** Landing hero — primary gradient CTA (links). */
export const marketingHeroPrimaryCta = cn(
  "group relative inline-flex min-h-[3.25rem] w-full items-center justify-center overflow-hidden",
  "rounded-full px-8 py-3.5 text-[0.9375rem] font-semibold tracking-wide text-[#0B0B0A]",
  "bg-[linear-gradient(135deg,#FFD875_0%,#FFB020_28%,#FF7A28_62%,#D94800_100%)]",
  "shadow-[0_4px_24px_-4px_rgba(255,140,0,0.55),0_16px_48px_-20px_rgba(217,72,0,0.45)]",
  "ring-1 ring-white/25 ring-inset",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-6px_rgba(255,140,0,0.65),0_20px_56px_-24px_rgba(217,72,0,0.5)]",
  "active:translate-y-0 active:scale-[0.99] active:duration-150",
  "sm:min-w-[13.5rem] sm:w-auto",
  appFocusVisible,
);

/** Landing hero — secondary glass CTA (links). */
export const marketingHeroSecondaryCta = cn(
  "inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-full px-8 py-3.5",
  "text-[0.9375rem] font-semibold tracking-wide text-[var(--foreground)]",
  "border border-[var(--foreground)]/14 bg-[var(--surface)]/55",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_4px_24px_-8px_rgba(27,18,0,0.12)]",
  "backdrop-blur-xl backdrop-saturate-150",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-0.5 hover:border-[var(--foreground)]/22 hover:bg-[var(--surface)]/80",
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_40px_-12px_rgba(27,18,0,0.18)]",
  "active:translate-y-0 active:scale-[0.99] active:duration-150",
  "sm:min-w-[13.5rem] sm:w-auto",
  appFocusVisible,
);

/** Inner shine overlay for `marketingHeroPrimaryCta` (optional). */
export const marketingHeroPrimaryCtaShine = cn(
  "absolute inset-0 opacity-0 transition-opacity duration-300",
  "bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)]",
  "group-hover:opacity-100",
);

/** Interior pages — primary CTA with arrow (PageHero). */
export const marketingPageHeroPrimaryCta = cn(
  "inline-flex items-center gap-2 rounded-full px-7 py-3.5",
  "font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#0B0B0A]",
  "bg-[linear-gradient(135deg,#FFD875_0%,#FFB020_28%,#FF7A28_62%,#D94800_100%)]",
  "shadow-[0_4px_20px_-6px_rgba(255,140,0,0.45)] transition-opacity hover:opacity-92",
  appFocusVisible,
);

export const marketingPageHeroSecondaryCta = cn(
  "inline-flex items-center justify-center rounded-full border border-[var(--foreground)]/16 px-6 py-3.5",
  "font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]",
  "transition-colors hover:bg-[var(--foreground)]/[0.06]",
  appFocusVisible,
);

/** Gallery / carousel icon controls — gold accent, matches honeycomb UI. */
export const appIconButtonGold = cn(
  "inline-flex size-10 items-center justify-center rounded-full border border-primary/45 text-primary transition-colors hover:bg-primary/12",
  appFocusVisible,
);

/** Shop / marketing filter panel shell. */
export const marketingFilterPanel = cn(
  "rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6",
);

/** Small “pill” badge (e.g. shop trust strip). */
export const marketingPillBadge = cn(
  "rounded-full border border-primary/30 bg-primary/10 px-5 py-2",
  "text-xs font-bold uppercase tracking-widest text-accent",
);
