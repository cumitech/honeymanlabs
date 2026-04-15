"use client";

import { FlaskConical, Menu, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { isActivePath } from "@/components/public/layout/header-nav";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { PillarsCarousel } from "@/components/public/home/pillars-carousel";
import { AUTHORITY_PILLARS } from "@/config/authority-pillars";
import { publicImages } from "@/config/public-media";
import { publicNavItems } from "@/config/public-nav";
import { useAppTranslation } from "@/lib/i18n/translations";
import { brandLogoBoxClassName } from "@/config/brand-logo";
import {
  appFocusVisible,
  marketingHeroPrimaryCta,
  marketingHeroPrimaryCtaShine,
  marketingHeroSecondaryCta,
} from "@/lib/app-ui";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function HeroNavLinks({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <ul
      className={cn(
        "flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2",
        "text-xs text-[var(--foreground)]/80 sm:text-sm md:gap-x-4 lg:gap-x-5",
        className,
      )}
    >
      {publicNavItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap transition-colors",
                active
                  ? "font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-[10px]"
                  : "hover:text-[var(--foreground)]",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function pointyTopHexPath(cx: number, cy: number, R: number): string {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    const x = cx + R * Math.cos(a);
    const y = cy + R * Math.sin(a);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(3)} ${y.toFixed(3)}`;
  }
  return `${d}Z`;
}

function axialToPixel(q: number, r: number, size: number) {
  const sqrt3 = Math.sqrt(3);
  return {
    x: size * sqrt3 * (q + r / 2),
    y: size * (3 / 2) * r,
  };
}

function pointyHexIntersectsTile(
  cx: number,
  cy: number,
  R: number,
  W: number,
  H: number,
): boolean {
  return !(cx + R < -0.5 || cx - R > W + 0.5 || cy + R < -0.5 || cy - R > H + 0.5);
}

function buildPointyHoneycombPattern(size: number): { W: number; H: number; d: string } {
  const sqrt3 = Math.sqrt(3);
  const W = 2 * sqrt3 * size;
  const H = 3 * size;
  const tx = (sqrt3 / 2) * size;
  const ty = size;
  const parts: string[] = [];

  for (let q = -1; q <= 3; q++) {
    for (let r = -1; r <= 2; r++) {
      const { x, y } = axialToPixel(q, r, size);
      const cx = x + tx;
      const cy = y + ty;
      if (pointyHexIntersectsTile(cx, cy, size, W, H)) {
        parts.push(pointyTopHexPath(cx, cy, size));
      }
    }
  }

  return { W, H, d: parts.join("") };
}

const HONEYCOMB_STROKE_HOTSPOTS: {
  cx: string;
  cy: string;
  r: string;
  tone: "primary" | "secondary";
  opacity: number;
}[] = [
  { cx: "47%", cy: "33%", r: "15%", tone: "primary", opacity: 0.88 },
  { cx: "11%", cy: "56%", r: "11%", tone: "secondary", opacity: 0.72 },
  { cx: "89%", cy: "29%", r: "12%", tone: "primary", opacity: 0.7 },
  { cx: "74%", cy: "74%", r: "13%", tone: "secondary", opacity: 0.68 },
  { cx: "24%", cy: "19%", r: "10%", tone: "secondary", opacity: 0.62 },
  { cx: "61%", cy: "49%", r: "9%", tone: "primary", opacity: 0.58 },
  { cx: "93%", cy: "61%", r: "8%", tone: "primary", opacity: 0.55 },
  { cx: "36%", cy: "72%", r: "9%", tone: "secondary", opacity: 0.52 },
];

function HeroHoneycombField({ idPrefix }: { idPrefix: string }) {
  const size = 13.5;
  const { W, H, d } = buildPointyHoneycombPattern(size);
  const patBase = `${idPrefix}-comb-base`;
  const patHiP = `${idPrefix}-comb-hi-p`;
  const patHiS = `${idPrefix}-comb-hi-s`;
  const filterStrokeGlow = `${idPrefix}-comb-stroke-glow`;

  const pathAttrs = {
    d,
    fill: "none" as const,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <>
      <svg
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full",
          "text-[rgba(88,52,4,0.26)] dark:text-[rgba(255,210,140,0.2)]",
        )}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <filter
            id={filterStrokeGlow}
            x="-55%"
            y="-55%"
            width="210%"
            height="210%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.35" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
              result="soft"
            />
            <feMerge>
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id={patBase} width={W} height={H} patternUnits="userSpaceOnUse">
            <path {...pathAttrs} stroke="currentColor" strokeWidth={0.9} />
          </pattern>

          <pattern id={patHiP} width={W} height={H} patternUnits="userSpaceOnUse">
            <path {...pathAttrs} stroke="var(--primary)" strokeWidth={1.2} />
          </pattern>

          <pattern id={patHiS} width={W} height={H} patternUnits="userSpaceOnUse">
            <path {...pathAttrs} stroke="var(--secondary)" strokeWidth={1.1} />
          </pattern>

          {HONEYCOMB_STROKE_HOTSPOTS.map((spot, i) => (
            <radialGradient
              key={`g-${i}`}
              id={`${idPrefix}-hot-rad-${i}`}
              cx={spot.cx}
              cy={spot.cy}
              r={spot.r}
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#fff" stopOpacity={1} />
              <stop offset="28%" stopColor="#fff" stopOpacity={0.85} />
              <stop offset="55%" stopColor="#fff" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#000" stopOpacity={1} />
            </radialGradient>
          ))}

          {HONEYCOMB_STROKE_HOTSPOTS.map((_, i) => (
            <mask key={`m-${i}`} id={`${idPrefix}-hot-mask-${i}`}>
              <rect width="100%" height="100%" fill={`url(#${idPrefix}-hot-rad-${i})`} />
            </mask>
          ))}
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patBase})`} opacity={0.36} />

        {HONEYCOMB_STROKE_HOTSPOTS.map((spot, i) => (
          <rect
            key={i}
            width="100%"
            height="100%"
            fill={`url(#${spot.tone === "primary" ? patHiP : patHiS})`}
            mask={`url(#${idPrefix}-hot-mask-${i})`}
            opacity={spot.opacity}
            filter={`url(#${filterStrokeGlow})`}
          />
        ))}
      </svg>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-multiply dark:mix-blend-soft-light",
          "opacity-[0.32] dark:opacity-[0.22]",
        )}
        style={{
          background: [
            "radial-gradient(ellipse 52% 46% at 50% 34%, rgba(255, 176, 72, 0.1), transparent 58%)",
            "radial-gradient(ellipse 88% 72% at 50% 42%, transparent 42%, rgba(27, 18, 0, 0.03) 100%)",
          ].join(", "),
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(27, 18, 0, 0.05) 0%, transparent 32%, transparent 78%, rgba(253, 246, 234, 0.06) 100%)",
        }}
        aria-hidden
      />
    </>
  );
}

export function LandingHero() {
  const { t } = useAppTranslation();
  const honeycombPatternId = useId().replace(/:/g, "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerElevated, setHeaderElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHeaderElevated(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full pb-16 md:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--surface)]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 85% 65% at 50% -8%, rgba(255, 165, 0, 0.16), transparent 55%)",
            "radial-gradient(ellipse 70% 50% at 15% 35%, rgba(255, 230, 168, 0.55), transparent 50%)",
            "radial-gradient(ellipse 60% 45% at 88% 40%, rgba(241, 220, 173, 0.65), transparent 45%)",
            "radial-gradient(ellipse 50% 40% at 70% 85%, rgba(255, 107, 0, 0.08), transparent 50%)",
          ].join(", "),
        }}
        aria-hidden
      />
      <HeroHoneycombField idPrefix={honeycombPatternId} />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(253,246,234,0.08)_0%,transparent_28%,transparent_72%,rgba(253,246,234,0.45)_100%)]"
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute left-[5%] top-[30%] z-[2] flex size-14 items-center justify-center",
          "rounded-full bg-[var(--surface)] shadow-[0_12px_36px_-12px_rgba(27,18,0,0.35)]",
          "max-lg:hidden",
        )}
        aria-hidden
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-[var(--primary)]/25 text-[var(--secondary)]">
          <FlaskConical className="size-6 stroke-[2.25]" aria-hidden />
        </div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute right-[7%] top-[26%] z-[2] flex size-[3.25rem] items-center justify-center",
          "rounded-full bg-[var(--surface)] shadow-[0_12px_36px_-12px_rgba(27,18,0,0.35)]",
          "max-lg:hidden",
        )}
        aria-hidden
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-[rgba(129,81,0,0.12)] text-[#815100]">
          <ShieldCheck className="size-5 stroke-[#815100]" strokeWidth={2} aria-hidden />
        </div>
      </div>

      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] pt-[env(safe-area-inset-top,0px)] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out",
          headerElevated
            ? cn(
                "border-b border-[var(--foreground)]/[0.09] bg-[var(--surface)]/92 shadow-[0_12px_40px_-28px_rgba(27,18,0,0.14)]",
                "backdrop-blur-md supports-[backdrop-filter]:bg-[var(--surface)]/82",
              )
            : "border-b border-transparent bg-transparent shadow-none backdrop-blur-none",
          "px-4 py-2.5 sm:px-6 sm:py-3 lg:px-10 xl:px-14",
        )}
      >
          <header
            className={cn(
              "flex w-full items-center justify-between gap-2 sm:gap-3",
              "md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-4 md:gap-y-0",
            )}
          >
            <Link
              href="/"
              className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3 md:justify-self-start"
              aria-label="Honeyman home"
            >
              <div className={cn("relative", brandLogoBoxClassName)}>
                <Image src="/logo.svg" alt="" fill className="object-contain" priority />
              </div>
              <div className="min-w-0 leading-tight">
                <span className="block font-display text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl">
                  Honeyman
                </span>
              </div>
            </Link>

            <nav
              className="hidden justify-self-center md:block"
              aria-label="Primary"
            >
              <HeroNavLinks className="justify-center gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6" />
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1.5 md:justify-self-end md:gap-2">
              <div className="hidden items-center gap-0.5 sm:gap-1.5 md:flex md:gap-2">
                <ThemeToggle
                  className={cn(
                    "relative size-9 shrink-0 border-[var(--foreground)]/15",
                    headerElevated
                      ? "bg-[var(--foreground)]/[0.04]"
                      : "bg-[var(--foreground)]/[0.03]",
                  )}
                />
                <div className="shrink-0">
                  <LanguageSwitcher />
                </div>
              </div>
              <Link
                href="/login"
                className={cn(
                  "hidden shrink-0 rounded-lg px-2 py-2 text-xs font-medium text-[var(--foreground)]/85 md:inline-flex",
                  "transition-colors hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] md:px-3 md:text-sm",
                  appFocusVisible,
                )}
              >
                {t.signIn}
              </Link>

              <div className="flex md:hidden">
                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-xl",
                        "border border-[var(--foreground)]/12 bg-[var(--foreground)]/[0.04]",
                        "text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.07]",
                        appFocusVisible,
                      )}
                      aria-label="Open menu"
                    >
                      <Menu className="size-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className={cn(
                      "h-full max-h-[100dvh] w-[min(20rem,calc(100vw-env(safe-area-inset-left)-env(safe-area-inset-right)))] max-w-none gap-0 border-[var(--foreground)]/10 bg-[var(--surface)] p-0 sm:max-w-none",
                      "shadow-[4px_0_24px_-8px_rgba(27,18,0,0.15)]",
                      "[&>button]:hidden",
                    )}
                  >
                  <div className="flex h-full min-h-0 flex-col">
                    <SheetHeader
                      className={cn(
                        "flex shrink-0 flex-row items-center justify-between space-y-0 border-b border-[var(--foreground)]/10 px-4 py-3.5",
                        "text-left",
                      )}
                    >
                      <SheetTitle className="font-sans text-sm font-semibold tracking-wide text-[var(--foreground)]">
                        Menu
                      </SheetTitle>
                      <SheetClose
                        className={cn(
                          "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-[var(--foreground)]",
                          "opacity-90 ring-offset-[var(--surface)] transition-opacity",
                          "hover:bg-[var(--foreground)]/[0.06] hover:opacity-100",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
                        )}
                      >
                        <X className="size-5" aria-hidden />
                        <span className="sr-only">Close menu</span>
                      </SheetClose>
                    </SheetHeader>

                    <div className="flex min-h-0 flex-1 flex-col px-4">
                      <nav
                        className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pt-3 pb-2"
                        aria-label="Primary mobile"
                      >
                        {publicNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)]",
                              "hover:bg-[var(--foreground)]/[0.06] active:bg-[var(--foreground)]/[0.09]",
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </nav>

                      <div
                        className={cn(
                          "mt-auto w-full shrink-0 border-t border-[var(--foreground)]/10",
                          "flex items-center justify-between gap-3 py-3",
                        )}
                      >
                        <ThemeToggle
                          className={cn(
                            "relative size-9 shrink-0 border-[var(--foreground)]/15",
                            "bg-[var(--foreground)]/[0.04]",
                          )}
                        />
                        <div className="min-w-0 flex-1 [&_[data-slot=select-trigger]]:w-full">
                          <LanguageSwitcher />
                        </div>
                      </div>

                      <div
                        className={cn(
                          "w-full border-t border-[var(--foreground)]/10",
                          "pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
                        )}
                      >
                        <Link
                          href="/login"
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex w-full items-center justify-center rounded-full border border-[var(--foreground)]/10",
                            "bg-[var(--foreground)]/[0.06] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]",
                            "hover:bg-[var(--foreground)]/[0.09]",
                          )}
                        >
                          {t.signIn}
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          </header>
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24",
            "pt-[calc(4rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4.35rem+env(safe-area-inset-top,0px))]",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute -bottom-2 z-[1] w-[min(48vw,10.5rem)] select-none sm:-bottom-3 sm:w-[min(42vw,12rem)]",
              "left-[-2.75rem] sm:left-[-3.5rem] md:left-[-4.25rem] md:w-[min(36%,13.5rem)]",
              "lg:left-[-5.5rem] lg:w-52 xl:-bottom-4 xl:left-[-6.75rem] xl:w-56",
            )}
            aria-hidden
          >
            <Image
              src={publicImages.beekeeperField.src}
              alt=""
              width={640}
              height={800}
              className={cn(
                "h-auto w-full object-contain object-bottom",
                "drop-shadow-[0_16px_36px_-8px_rgba(27,18,0,0.22)]",
              )}
              sizes="(max-width: 640px) 52vw, (max-width: 1024px) 15rem, 17rem"
            />
          </div>

          <div
            className={cn(
              "pointer-events-none absolute -bottom-1 z-[1] hidden w-[min(44vw,9.5rem)] select-none sm:block sm:w-[min(40vw,11rem)]",
              "right-[-2rem] sm:right-[-2.75rem] sm:-bottom-2 md:right-[-3.75rem] md:w-[min(34%,12.5rem)]",
              "lg:right-[-5rem] lg:w-56 xl:-bottom-3 xl:right-[-6.25rem] xl:w-[15rem]",
            )}
            aria-hidden
          >
            <Image
              src={publicImages.honeyJarCutout.src}
              alt=""
              width={1280}
              height={1280}
              className={cn(
                "h-auto w-full object-contain object-bottom",
                "drop-shadow-[0_18px_40px_-10px_rgba(255,140,0,0.25)]",
              )}
              sizes="(max-width: 640px) 44vw, (max-width: 1024px) 14rem, 15rem"
            />
          </div>

          <div
            className={cn(
              "relative z-[2] mx-auto w-full max-w-3xl text-center",
              "px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-14 lg:py-24 xl:px-16 xl:py-28",
            )}
          >
            <div
              className={cn(
                "pointer-events-none mb-7 flex justify-center sm:mb-8",
                "motion-safe:animate-hero-bee-float",
              )}
              aria-hidden
            >
              <Image
                src={publicImages.brandBee.src}
                alt=""
                width={256}
                height={256}
                className={cn(
                  "h-16 w-auto object-contain select-none sm:h-20 md:h-24 lg:h-28",
                  "opacity-[0.92] drop-shadow-[0_10px_28px_rgba(194,58,0,0.26)]",
                  "dark:opacity-[0.88] dark:drop-shadow-[0_10px_30px_rgba(255,180,0,0.22)]",
                )}
                priority
              />
            </div>
            <h1
              id="hero-heading"
              className={cn(
                "font-display text-[clamp(2.375rem,5.75vw+0.25rem,4rem)] font-bold leading-[1.06] tracking-tight",
              )}
            >
              <span
                className={cn(
                  "relative inline-block bg-clip-text text-transparent",
                  "[-webkit-background-clip:text] [background-clip:text]",
                  // Light: deep browns → amber so “Premium…” isn’t washed out on cream hero.
                  "bg-[linear-gradient(125deg,#1B1200_0%,#3D2914_12%,#6B4E0F_28%,#B8860B_48%,#D97706_72%,#9A3412_100%)]",
                  // Dark: luminous gold (unchanged character on dark bg).
                  "dark:bg-[linear-gradient(125deg,#FFF4D6_0%,#FFD24A_18%,#FFB800_42%,#FF7A1A_72%,#C23A00_100%)]",
                  "drop-shadow-[0_1px_0_rgba(255,255,255,0.45),0_2px_12px_rgba(27,18,0,0.2)]",
                  "dark:drop-shadow-[0_1px_0_rgba(255,255,255,0.5),0_2px_14px_rgba(194,58,0,0.28),0_12px_44px_rgba(255,140,0,0.2)]",
                )}
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Premium honey with enterprise traceability.
              </span>
            </h1>
            <p
              className={cn(
                "mx-auto mt-7 max-w-2xl text-pretty sm:mt-8 md:mt-9",
                "text-lg leading-[1.7] text-[var(--foreground)]/90 sm:text-xl sm:leading-relaxed",
                "font-medium tracking-tight [text-shadow:0_1px_24px_rgba(253,246,234,0.55)]",
              )}
            >
              Honeyman blends artisan authenticity with verified quality systems, so every jar
              can tell its story with confidence.
            </p>

            <div
              className={cn(
                "mx-auto mt-10 flex w-full max-w-lg flex-col items-stretch justify-center gap-3.5",
                "sm:mt-12 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-center sm:gap-4",
              )}
            >
              <Link href="/honey-testing-lab" className={cn("group", marketingHeroPrimaryCta)}>
                <span className={marketingHeroPrimaryCtaShine} aria-hidden />
                <span className="relative">Explore Traceability</span>
              </Link>
              <Link href="/products" className={marketingHeroSecondaryCta}>
                Verified Quality
              </Link>
            </div>
          </div>

        <PillarsCarousel pillars={AUTHORITY_PILLARS} />
        </div>

      {/* Long, soft fade into #f9f4e8 — avoids a visible seam above Our mission */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40",
          "bg-[linear-gradient(180deg,transparent_0%,rgba(249,244,232,0.2)_22%,rgba(249,244,232,0.72)_58%,#f9f4e8_100%)]",
          "sm:h-48 md:h-56",
        )}
      />
    </section>
  );
}
