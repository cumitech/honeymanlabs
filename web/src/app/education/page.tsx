import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, PlayCircle, ShieldCheck, Sprout, Stethoscope } from "lucide-react";

import { ArticleCard, type PublicArticleCardData } from "@/components/public/article/article-card";
import { PageHero } from "@/components/public/layout/page-hero";
import { Button } from "@/components/ui/button";
import { publicImages } from "@/config/public-media";
import type { Article } from "@/models/article";

const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const heroHighlights = [
  "Bridging traditional craft and lab standards",
  "Designed for producers, buyers, and quality teams",
];

const capabilityTags = ["Enzymes", "Immunity", "Antioxidants"];
const partnerBenefits = ["Traceability chip enabled", "Premium payout rates"];
const operatingRegions = ["Adamaoua", "Northwest", "West", "East"];

export const metadata: Metadata = {
  title: "Education Programs · Honeyman",
  description:
    "Learning tracks for beekeepers, coordinators, and partner teams building stronger honey quality and traceability practices.",
  alternates: {
    canonical: "/education",
  },
};

async function fetchLatestArticles(): Promise<PublicArticleCardData[]> {
  try {
    const response = await fetch(`${APP_API_URL}/articles`, {
      next: { revalidate: 120 },
      headers: { "X-Language": "en" },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as Article[];
    return data.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      tag: "Education",
      excerpt: item.excerpt ?? "Read the latest field and lab insights from Honeyman.",
      imageSrc: "/images/honeycombs-5.png",
      href: "/education",
    }));
  } catch {
    return [];
  }
}

export default async function EducationPage() {
  const resourceCards = await fetchLatestArticles();

  return (
    <main className="relative mx-auto w-full max-w-7xl overflow-hidden pb-24">
      <PageHero
        eyebrow="Empowering the hive"
        headingId="education-hero-heading"
        title={
          <>
            The Education <span className="italic text-[#9A6B2D] dark:text-amber-400/90">Collective.</span>
          </>
        }
        description="Bridging the gap between Cameroonian beekeeping traditions and modern lab-certified standards. Explore the science and story behind pure honey."
        imageSrc={publicImages.beekeeperField.src}
        imageAlt={publicImages.beekeeperField.alt}
        imagePriority
        cta={{ href: "#resources", label: "Start learning" }}
        ctaSecondary={{ href: "/honey-testing-lab", label: "Lab protocols" }}
      >
        <ul className="space-y-2">
          {heroHighlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-[#4B2E1E] dark:text-stone-300">
              <Check className="h-4 w-4 shrink-0 text-[#9A6B2D]" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-muted/30 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Deep Knowledge <span className="italic">Vault</span>
            </h2>
            <p className="mt-3 text-muted-foreground">The definitive guide to liquid gold.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <article className="group flex flex-col justify-between rounded-3xl border border-border/60 bg-card p-8 shadow-sm transition-all hover:shadow-xl md:col-span-2 md:row-span-2">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  How to Detect Fake Honey
                </h3>
                <p className="mb-6 mt-4 leading-relaxed text-muted-foreground">
                  Learn the five practical tests used to separate pure, unprocessed honey from
                  syrup-heavy alternatives.
                </p>
              </div>
              <Image
                src="/images/premium_photo-1664273586606-d7c9804729c2.jpg"
                alt="Beaker with honey undergoing purity test"
                width={900}
                height={500}
                className="mb-6 h-48 w-full rounded-2xl object-cover"
              />
              <Button variant="link" className="w-fit px-0 text-sm uppercase tracking-wider text-foreground">
                Read the Protocol
              </Button>
            </article>

            <article className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-xl md:col-span-2">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="font-display text-3xl">Health &amp; Longevity</h3>
                <Stethoscope className="h-8 w-8" />
              </div>
              <p className="mb-6 text-lg/relaxed text-primary-foreground/90">
                Beyond sweetness: understanding the antimicrobial properties and enzyme richness of raw
                forest honey.
              </p>
              <div className="flex flex-wrap gap-2">
                {capabilityTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6">
              <Sprout className="mb-4 h-7 w-7 text-primary" />
              <h4 className="font-display text-2xl text-foreground">Sustainable Hives</h4>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Ethical harvest techniques from the Adamaoua highlands.
              </p>
              <Button variant="link" className="w-fit px-0 font-bold text-primary">
                Download Guide
              </Button>
            </article>

            <article className="rounded-3xl bg-foreground p-6 text-background">
              <div className="group relative mb-4 aspect-square cursor-pointer overflow-hidden rounded-xl">
                <Image
                  src="/images/photo-1549269459-ba9e31874ef2.jpg"
                  alt="Beekeeper in white suit tending hives"
                  width={700}
                  height={700}
                  className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <PlayCircle className="h-14 w-14 text-primary" />
                </div>
              </div>
              <h4 className="font-display text-xl">Video: The First Harvest</h4>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20 md:px-8">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 overflow-hidden rounded-[2rem] border border-border bg-card p-10 md:flex-row md:gap-16 md:p-14">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
          <div className="z-10 flex-1 space-y-6">
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              Become a <span className="italic text-primary">Honeyman Partner</span> Beekeeper
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              Join our certified network. We support testing, logistics, and market access while you
              focus on producing exceptional honey.
            </p>
            <div className="space-y-3">
              {partnerBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="z-10 w-full max-w-md rounded-3xl border border-border bg-background p-8 shadow-2xl">
            <form className="space-y-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Full Name
                <input
                  className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none transition-colors focus:border-primary"
                  placeholder="Kofi Mensah"
                  type="text"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Region of Operation
                <select className="mt-2 w-full appearance-none border-b border-border bg-transparent py-2 outline-none transition-colors focus:border-primary">
                  {operatingRegions.map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Hive Count
                <input
                  className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none transition-colors focus:border-primary"
                  placeholder="e.g. 50"
                  type="number"
                />
              </label>
              <Button className="h-11 w-full rounded-xl text-sm font-bold">Apply to Join Hive</Button>
            </form>
          </div>
        </div>
      </section>

      <section id="resources" className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Latest <span className="italic">Resources</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Stay updated with beekeeping trends and laboratory breakthroughs.
            </p>
          </div>
          <Button variant="ghost" className="hidden uppercase tracking-[0.15em] text-primary md:inline-flex">
            View All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {resourceCards.map((card) => (
            <ArticleCard key={card.id} article={card} />
          ))}
        </div>
      </section>
    </main>
  );
}
