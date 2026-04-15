import type { Metadata } from "next";
import { Award, Clock3, ShieldCheck, Truck } from "lucide-react";

import { CoreValues } from "@/components/public/about/core-values";
import { AboutHero } from "@/components/public/about/hero";
import { MissionCards } from "@/components/public/about/mission-cards";
import { TeamSection } from "@/components/public/about/team";
import { TraceabilityChip } from "@/components/public/about/traceability-chip";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";
import { AboutStory } from "../../components/public/about/story";

export const metadata: Metadata = {
  title: "About · Honeyman",
  description:
    "Legacy, science, and the people behind Honeyman — from the Adamaoua highlands to the lab bench.",
};

export default function AboutPage() {
  const warmCard =
    "rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 p-5 shadow-sm backdrop-blur-[2px] md:p-6 dark:border-stone-600/30 dark:bg-stone-900/45";

  const trustStats = [
    { label: "Lab-verified lots", value: "100%" },
    { label: "Partner-first payouts", value: "Fair" },
    { label: "Traceable batch records", value: "End-to-end" },
    { label: "Export readiness", value: "Buyer-aligned" },
  ];

  const processHighlights = [
    {
      icon: ShieldCheck,
      title: "Source Verification",
      body: "We validate origin, harvest conditions, and producer records before any lot enters the pipeline.",
    },
    {
      icon: Award,
      title: "Quality Screening",
      body: "Moisture, freshness, and purity checks are documented in every batch file for procurement confidence.",
    },
    {
      icon: Truck,
      title: "Export Documentation",
      body: "We prepare traceability and compliance documents in formats that wholesale buyers can audit quickly.",
    },
    {
      icon: Clock3,
      title: "Long-term Support",
      body: "Producer training and post-shipment support keep quality consistent across harvest cycles.",
    },
  ];

  return (
    <main
      className={cn(
        "relative flex-1 overflow-hidden text-[#2a2218] dark:bg-[#14100d] dark:text-stone-100",
        homeMarketingBand.bg,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(201,162,39,0.12),transparent_42%),radial-gradient(circle_at_92%_74%,rgba(154,107,45,0.08),transparent_38%)]"
        aria-hidden
      />
      <div className="relative z-10">
        <AboutHero />
        <section className="mx-auto max-w-7xl bg-gradient-to-b from-[#f7eed9]/55 to-transparent px-6 pt-3 pb-8 md:px-8 md:pt-4 md:pb-12 dark:from-stone-900/30">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustStats.map((item) => (
              <article key={item.label} className={warmCard}>
                <p className="font-display text-2xl font-semibold text-[#9A6B2D] md:text-3xl dark:text-amber-400/90">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#5c4a38] md:text-sm dark:text-stone-400">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>
        <AboutStory />
        <MissionCards />
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <header className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B] dark:text-amber-400/90">
                How we operate
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Built for buyers, rooted in beekeeping communities
              </h2>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {processHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 p-6 shadow-sm dark:border-stone-600/30 dark:bg-stone-900/45"
                >
                  <item.icon className="h-7 w-7 text-[#B8860B] dark:text-amber-400/90" strokeWidth={1.8} />
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4a38] dark:text-stone-400">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CoreValues />
        <TraceabilityChip />
        <TeamSection />
      </div>
    </main>
  );
}
