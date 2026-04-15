import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, TestTube2 } from "lucide-react";

import { PageHero } from "@/components/public/layout/page-hero";
import { ShopCatalog } from "@/components/public/shop/shop-catalog";
import { Button } from "@/components/ui/button";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { marketingPillBadge } from "@/lib/app-ui";
import { publicImages } from "@/config/public-media";
import { cn } from "@/lib/utils";
import type { Product } from "@/models/product";

const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const trustBadges = [
  "ISO 17025 certified",
  "Organic export grade",
  "Adulteration free",
  "Global traceability",
] as const;

export const metadata: Metadata = {
  title: "Shop · Honeyman",
  description:
    "Discover artisan honey, hive products, and beekeeper essentials from Honeyman with lab-backed quality assurance.",
  alternates: {
    canonical: "/shop",
  },
}; 

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${APP_API_URL}/products`, {
      next: { revalidate: 120 },
      headers: {
        "X-Language": "en",
      },
    });
    if (!response.ok) return [];
    return (await response.json()) as Product[];
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await fetchProducts();
  const warmCard =
    "rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 shadow-sm backdrop-blur-[2px] dark:border-stone-600/30 dark:bg-stone-900/45";

  return (
    <main
      className={cn(
        "relative overflow-hidden pb-24 text-[#2a2218] dark:bg-[#14100d] dark:text-stone-100",
        homeMarketingBand.bg,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(201,162,39,0.12),transparent_42%),radial-gradient(circle_at_92%_74%,rgba(154,107,45,0.08),transparent_38%)]"
        aria-hidden
      />
      <PageHero
        eyebrow="The artisan's reserve"
        headingId="shop-hero-heading"
        className="border-b-0 pb-2 md:pb-3"
        title={
          <>
            Nectar of the gods, <br className="hidden sm:block" />
            crafted for the connoisseur.
          </>
        }
        description="Browse our live catalog with premium honey, hive essentials, and laboratory-grade products from trusted producers—curated weekly for quality you can taste."
        imageSrc={publicImages.honeyJarCutout.src}
        imageAlt={publicImages.honeyJarCutout.alt}
        imagePriority
        imageObjectFit="contain"
        cta={{ href: "#shop-catalog", label: "Order now" }}
        ctaSecondary={{ href: "/honey-testing-lab", label: "Lab testing" }}
      />

      <section className="relative mx-auto mb-10 max-w-7xl bg-gradient-to-b from-[#f7eed9]/55 to-transparent px-6 pt-4 md:pt-5 dark:from-stone-900/30">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm text-[#5c4a38] dark:text-stone-400">
            Live inventory updates as batches clear lab checks. Filter by origin, format, and partner
            programme.
          </p>
          <div className={cn(marketingPillBadge, "border-[#4B2E1E]/15 bg-[#fffdf8]/85 dark:bg-stone-900/45")}>
            <p className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Curated weekly
            </p>
          </div>
        </div>
      </section>

      <div id="shop-catalog">
        <ShopCatalog products={products} />
      </div>

      <section className="border-y border-[#4B2E1E]/10 bg-[#f5ebd4]/65 py-8 dark:border-stone-700/40 dark:bg-stone-900/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6">
          {trustBadges.map((item) => (
            <div key={item} className="flex items-center gap-2 text-[#5c4a38] dark:text-stone-400">
              <ShieldCheck className="h-5 w-5 text-[#B8860B] dark:text-amber-400/90" />
              <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-24 mt-16 max-w-7xl px-6">
        <div
          className={cn(
            warmCard,
            "relative overflow-hidden rounded-3xl border-[#9A6B2D]/25 bg-gradient-to-r from-[#f6e7c4]/80 via-[#fff8eb]/95 to-[#efe0bd]/70 p-10 md:p-14 dark:from-stone-900/70 dark:via-stone-900/80 dark:to-stone-800/60",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(201,162,39,0.18),transparent_45%)]" />
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex-1 space-y-4">
              <span className="font-display text-lg tracking-[0.2em] text-[#9A6B2D] dark:text-amber-400/90">OUR PROMISE</span>
              <h2 className="font-display text-4xl italic leading-tight md:text-5xl">
                Every drop is lab-certified for absolute purity.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-[#5c4a38] dark:text-stone-400">
                We verify floral origin and screen for contaminants so each batch meets export-ready
                quality standards.
              </p>
              <Button variant="honey" asChild>
                <Link href="/honey-testing-lab">
                  View latest lab reports
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-[#4B2E1E]/10 bg-[#fffdf8]/90 p-7 backdrop-blur dark:border-stone-600/30 dark:bg-stone-900/50">
              <div className="mb-4 flex items-center gap-3">
                <TestTube2 className="h-9 w-9 text-[#B8860B] dark:text-amber-400/90" />
                <div>
                  <p className="font-bold">Batch #AH-2026-08</p>
                  <p className="text-xs font-bold uppercase text-[#9A6B2D] dark:text-amber-400/90">Status: certified pure</p>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e9dcc3] dark:bg-stone-800">
                <div className="h-full w-[98%] bg-[#B8860B]" />
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#5c4a38] dark:text-stone-400">
                <span>Floral purity</span>
                <span>98.4%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

