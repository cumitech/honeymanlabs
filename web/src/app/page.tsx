import {
  BadgeCheck,
  Brain,
  Dna,
  FlaskConical,
  GraduationCap,
  Leaf,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FeaturedProductCard } from "@/components/public/home/featured-product-card";
import PixelSnow from "@/components/public/home/pixel-snow";
import { ResourceArticleCard } from "@/components/public/home/resource-article-card";
import { featuredProducts, resourceArticles } from "@/content/home";

const HERO_IMAGE_SRC = "/images/premium_photo-1664273586606-d7c9804729c2.jpg";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section
        aria-labelledby="hero-heading"
        className="relative w-full overflow-hidden shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
      >
        <div className="relative h-dvh w-full">
          <div
            className="absolute inset-0 bg-[linear-gradient(145deg,#0d0804_0%,#1a1008_42%,#0a0603_100%)]"
            aria-hidden
          />
          <PixelSnow
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.2}
            pixelResolution={200}
            speed={0.55}
            density={0.2}
            direction={125}
            brightness={0.88}
            depthFade={11}
            farPlane={20}
            gamma={0.48}
            variant="square"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_25%_15%,rgba(255,165,0,0.14),transparent_50%)]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col justify-center px-4 py-8 pt-14 sm:px-8 md:px-12">
            <div className="grid min-h-0 grid-cols-1 items-center gap-10 md:grid-cols-2 md:items-center md:gap-10">
              <div>
                <h1
                  id="hero-heading"
                  className="text-4xl font-bold leading-tight md:text-5xl"
                >
                  <span
                    className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#FFE6A8_0%,#FFB800_35%,#FF6B00_65%,#FF9A4A_100%)]"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    Premium honey with enterprise traceability.
                  </span>
                </h1>

                <p className="mt-5 max-w-prose text-base text-white/80 md:text-lg">
                  Honeyman Labs blends artisan authenticity with verified
                  quality systems, so every jar can tell its story with
                  confidence.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/honey-testing-lab"
                    className={[
                      "inline-flex items-center justify-center",
                      "rounded-xl px-5 py-3 text-sm font-semibold",
                      "bg-[linear-gradient(120deg,#FFB800_0%,#FF6B00_55%,#D93A00_100%)]",
                      "text-[#0B0B0A]",
                      "shadow-[0_20px_55px_-35px_rgba(255,107,0,0.9)]",
                      "hover:brightness-110 transition-all duration-300 ease-out",
                    ].join(" ")}
                  >
                    Explore Traceability
                  </Link>

                  <Link
                    href="/products"
                    className={[
                      "inline-flex items-center justify-center",
                      "rounded-xl px-5 py-3 text-sm font-semibold",
                      "border border-white/20 bg-white/10 text-white",
                      "shadow-[0_22px_65px_-55px_rgba(0,0,0,0.4)]",
                      "backdrop-blur-sm transition-colors duration-300 ease-out hover:bg-white/18",
                    ].join(" ")}
                  >
                    Verified Quality
                  </Link>
                </div>

                <p className="mt-8 max-w-md border-l-2 border-[var(--primary)]/80 pl-4 text-sm leading-relaxed text-white/70">
                  <span className="font-accent text-[0.7rem] uppercase tracking-[0.2em] text-[#FFD699]">
                    Lab verification
                  </span>
                  <span className="mt-1 block text-[0.95rem] text-white/85">
                    Every batch is tested against our purity standards—traceable
                    quality you can stand behind.
                  </span>
                  <Link
                    href="/honey-testing-lab"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFB84D] underline-offset-4 transition-colors hover:text-[#FFD699] hover:underline"
                  >
                    See how we test
                    <span aria-hidden>→</span>
                  </Link>
                </p>
              </div>

              <figure className="group relative flex min-h-0 w-full justify-center md:justify-end">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[1.75rem] bg-[rgba(255,165,0,0.05)] blur-3xl transition-all duration-[1.2s] ease-out group-hover:bg-[rgba(255,165,0,0.1)] motion-reduce:transition-none"
                  aria-hidden
                />
                {/* Framed portrait: gradient bezel + inner glass edge + vignette (common editorial / luxury product pattern) */}
                <div
                  className={[
                    "relative mx-auto w-full max-w-[384px] md:mx-0 md:ml-auto",
                    "rounded-2xl p-px",
                    "bg-[linear-gradient(145deg,rgba(255,184,77,0.55)_0%,rgba(255,255,255,0.12)_38%,rgba(255,255,255,0.04)_62%,rgba(0,0,0,0.35)_100%)]",
                    "shadow-[0_32px_90px_-28px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative aspect-[4/5] max-h-[min(480px,calc(100dvh-12rem))] overflow-hidden rounded-[15px]",
                      "bg-[#120a06]",
                    ].join(" ")}
                  >
                    <Image
                      src={HERO_IMAGE_SRC}
                      alt="Golden viscous honey pouring from a wooden dipper"
                      fill
                      sizes="(max-width: 768px) min(100vw, 384px), 384px"
                      className="object-cover object-[center_38%] transition-transform duration-[1.35s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.03]"
                      priority
                    />
                    {/* Depth + polish without covering the subject */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/12"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(165deg,rgba(255,255,255,0.14)_0%,transparent_42%,transparent_58%,rgba(0,0,0,0.45)_100%)] mix-blend-soft-light opacity-90"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]"
                      aria-hidden
                    />
                  </div>
                </div>
                <figcaption className="sr-only">
                  Hero product photography for Honeyman Labs honey.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* What Honeyman Does — mission */}
      <section
        aria-labelledby="mission-heading"
        className="border-y border-[#815100]/5 bg-[var(--surface)] py-24"
      >
        <div className="container mx-auto max-w-5xl px-8 text-center">
          <span className="font-accent mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#9C3F00]">
            Our Mission
          </span>
          <h2
            id="mission-heading"
            className="mb-8 text-4xl font-bold leading-tight text-[#312E27] md:text-5xl [font-family:var(--font-display)]"
          >
            The Bridge Between Tradition and Science
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/75 md:text-xl">
            In a market flooded with adulterated products, Honeyman stands as a
            beacon of authenticity. We combine generations of Cameroonian
            beekeeping wisdom with rigorous laboratory protocols to ensure every
            jar of honey is exactly as nature intended: raw, pure, and potent.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-3">
              <BadgeCheck
                className="h-6 w-6 shrink-0 text-[var(--primary)]"
                aria-hidden
              />
              <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                Trusted Authority
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Brain
                className="h-6 w-6 shrink-0 text-[var(--primary)]"
                aria-hidden
              />
              <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                Scientific Rigor
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf
                className="h-6 w-6 shrink-0 text-[var(--primary)]"
                aria-hidden
              />
              <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                Artisanal Roots
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Pillars — ecosystem */}
      <section
        aria-labelledby="pillars-heading"
        className="relative bg-[#FFF8EC] py-24"
      >
        <div className="container mx-auto max-w-7xl px-8">
          <div className="mb-20 text-center">
            <span className="font-accent mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
              Our Ecosystem
            </span>
            <h2
              id="pillars-heading"
              className="text-4xl font-bold text-[#312E27] md:text-5xl [font-family:var(--font-display)]"
            >
              The Pillars of Authority
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                icon: ShoppingBasket,
                title: "Products",
                body: "Ethically sourced, single-origin honey from the Adamaoua highlands to the coastal forests.",
              },
              {
                icon: FlaskConical,
                title: "Consultancy & QA",
                body: "Verification processes guaranteeing 0% adulteration and 100% trace-to-hive transparency.",
              },
              {
                icon: GraduationCap,
                title: "Education",
                body: "Empowering local beekeepers with modern, sustainable techniques to increase biodiversity.",
              },
              {
                icon: Dna,
                title: "Research",
                body: "Mapping the unique medicinal properties of African honey varieties with regional labs.",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={[
                    "group rounded-2xl border border-[#815100]/5 bg-white p-10 shadow-sm",
                    "transition-all hover:border-[#FFA500]",
                  ].join(" ")}
                >
                  <Icon
                    className="mb-6 block h-10 w-10 text-[#FF6B00] md:h-11 md:w-11"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <h3 className="mb-4 text-2xl font-bold text-[#312E27] [font-family:var(--font-display)]">
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/75">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        aria-labelledby="featured-products-heading"
        className="bg-[#FFF8EC] py-24"
      >
        <div className="container mx-auto max-w-7xl px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="featured-products-heading"
              className="text-4xl font-bold text-[#312E27] [font-family:var(--font-display)]"
            >
              Featured Selection
            </h2>
            <Link
              href="/products"
              className="inline-flex w-fit shrink-0 border-b-2 border-[#FFA500] pb-1 text-base font-bold text-[#9C3F00] transition-colors hover:text-[#815100]"
            >
              View Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources Feed — education */}
      <section
        aria-labelledby="resources-heading"
        className="mx-auto max-w-7xl px-8 py-24"
      >
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="resources-heading"
              className="mb-2 text-4xl font-bold text-[#312E27] md:text-5xl [font-family:var(--font-display)]"
            >
              Latest <span className="italic">Resources</span>
            </h2>
            <p className="max-w-xl text-foreground/70">
              Stay updated with beekeeping trends and laboratory breakthroughs.
            </p>
          </div>
          <Link
            href="/blog-posts"
            className="hidden font-accent text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] transition-colors hover:text-[var(--secondary)] md:block"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {resourceArticles.map((article) => (
            <ResourceArticleCard key={article.id} article={article} />
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/blog-posts"
            className="inline-flex font-accent text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] transition-colors hover:text-[var(--secondary)]"
          >
            View All Articles
          </Link>
        </div>
      </section>

      {/* Beekeeper Network */}
      <section
        aria-labelledby="beekeeper-network-heading"
        className="bg-surface py-32"
      >
        <div className="mx-auto max-w-screen-2xl px-8">
          <div className="honey-gradient relative overflow-hidden rounded-[3rem] p-12 md:p-24">
            <div
              className="pointer-events-none absolute inset-0 bg-black/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />
            <div className="relative z-10 max-w-3xl text-white">
              <h2
                id="beekeeper-network-heading"
                className="mb-8 text-4xl font-bold leading-tight [font-family:var(--font-display)] md:text-5xl lg:text-6xl"
              >
                Partner with the <br />
                Gold Standard
              </h2>
              <p className="mb-12 text-lg leading-relaxed opacity-90 md:text-xl">
                Are you a producer of exceptional honey? Join our verified
                network to access premium international markets. We provide the
                testing, you provide the purity.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-5 text-lg font-bold text-[var(--primary)] shadow-sm transition-all hover:shadow-2xl"
                >
                  Join the Network
                </Link>
                <Link
                  href="/honey-testing-lab"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-transparent px-10 py-5 text-lg font-bold text-white transition-all hover:bg-white/10"
                >
                  View Criteria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
