import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { marketingPageHeroPrimaryCta, marketingPageHeroSecondaryCta } from "@/lib/app-ui";
import { cn } from "@/lib/utils";

const cream = "bg-[#FDF9F3]";
const headline = "text-[#4B2E1E] dark:text-[#E8DDD4]";
const body = "text-[#6B5344] dark:text-stone-400";

function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        className="absolute -right-[8%] top-[8%] h-[95%] w-[min(78vw,52rem)] text-[#4B2E1E]/[0.07] dark:text-stone-100/[0.06]"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M280 40c-40 80-20 200 30 280s60 200 20 280"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M320 20c-50 100-30 220 40 300s50 210 0 300"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M360 60c-35 90-15 210 50 290s45 190-10 270"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M240 100c-30 70-10 180 60 250s70 160 30 240"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-[4%] top-[12%] h-24 w-24 text-[#4B2E1E]/[0.08] dark:text-stone-100/[0.07] md:h-32 md:w-32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M32 4c-4 8-12 12-18 18 6 10 8 22 18 30 10-8 12-20 18-30-6-6-14-10-18-18z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M32 22v28M22 36h20"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export type PageHeroCta = {
  href: string;
  label: string;
};

export type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePriority?: boolean;
  cta?: PageHeroCta;
  ctaSecondary?: PageHeroCta;
  /** Extra content between description and CTAs (e.g. bullet list) */
  children?: ReactNode;
  headingId?: string;
  className?: string;
  imageObjectFit?: "cover" | "contain";
  imageSizes?: string;
  /** Use when `imageSrc` is an absolute URL not covered by `next.config` remotePatterns */
  imageUnoptimized?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePriority = false,
  cta,
  ctaSecondary,
  children,
  headingId,
  className,
  imageObjectFit = "cover",
  imageSizes = "(max-width: 768px) 88vw, 40vw",
  imageUnoptimized = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        cream,
        "dark:bg-[#14100d]",
        "border-b border-[#4B2E1E]/[0.06] dark:border-stone-700/40",
        className,
      )}
    >
      <HeroBackdrop />

      <div className="relative z-[1] mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-14 md:px-8 md:py-20 lg:gap-20">
        <div className="order-2 flex flex-col md:order-1">
          {eyebrow ? (
            <p
              className={cn(
                "mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em]",
                body,
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={headingId}
            className={cn(
              "font-display text-[2.25rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]",
              headline,
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-6 max-w-xl font-sans text-base leading-relaxed md:text-lg",
              body,
            )}
          >
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
          {(cta || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {cta ? (
                <Link href={cta.href} className={marketingPageHeroPrimaryCta}>
                  {cta.label}
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </Link>
              ) : null}
              {ctaSecondary ? (
                <Link href={ctaSecondary.href} className={marketingPageHeroSecondaryCta}>
                  {ctaSecondary.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>

        <div className="relative order-1 flex justify-center md:order-2 md:justify-end">
          <div
            className={cn(
              "relative aspect-square w-[min(100%,20rem)] shrink-0 sm:w-[min(100%,24rem)] md:w-[min(100%,28rem)]",
              "rounded-full bg-[#F5EFE6] shadow-[0_28px_80px_-32px_rgba(75,46,30,0.45)] ring-1 ring-[#4B2E1E]/[0.08]",
              "dark:bg-stone-900/80 dark:ring-stone-600/30",
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority={imagePriority}
              sizes={imageSizes}
              unoptimized={imageUnoptimized}
              className={cn(
                "rounded-full object-center",
                imageObjectFit === "contain" ? "object-contain p-6 md:p-8" : "object-cover",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use `PageHero` — kept so older JSX/runtime bundles don’t throw. */
export const PublicPageHero = PageHero;
