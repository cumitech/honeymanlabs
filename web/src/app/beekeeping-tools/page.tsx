import type { Metadata } from "next";

import { PageHero } from "@/components/public/layout/page-hero";
import { publicImages } from "@/config/public-media";

const starterTools = [
  {
    name: "Protective Wear Kit",
    description: "Ventilated suit, gloves, and veil selected for long field sessions in warm climates.",
  },
  {
    name: "Smoker and Fuel Set",
    description: "Balanced airflow and clean-burning fuel to keep inspections calm and controlled.",
  },
  {
    name: "Hive Inspection Essentials",
    description: "Hive tool, frame grip, and brush for safe handling and consistent colony checks.",
  },
];

const apiaryWorkflowTools = [
  "Harvest and filtration sets",
  "Food-safe storage drums and taps",
  "Digital hive scales and data logs",
  "Queen marking and brood tracking tools",
];

export const metadata: Metadata = {
  title: "Beekeeping Tools · Honeyman",
  description:
    "Explore trusted beekeeping tools for hive care, honey harvest, and traceable operations across growing apiaries.",
  alternates: {
    canonical: "/beekeeping-tools",
  },
};

export default function BeekeepingToolsPage() {
  return (
    <main className="w-full bg-[#FDF9F3] dark:bg-[#14100d]">
      <PageHero
        eyebrow="Field equipment"
        headingId="beekeeping-tools-hero-heading"
        title="Beekeeping tools designed for daily, practical work"
        description="We focus on the tools that keep colonies healthy and operations consistent: safe handling gear, clean harvest systems, and reliable tracking accessories your team can use every day."
        imageSrc={publicImages.beekeeperField.src}
        imageAlt={publicImages.beekeeperField.alt}
        cta={{ href: "/shop", label: "Order now" }}
        ctaSecondary={{ href: "/contact", label: "Ask an expert" }}
      />

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <section className="grid gap-6 md:grid-cols-3">
        {starterTools.map((tool) => (
          <article key={tool.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-foreground">{tool.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-muted/40 p-7 md:p-8">
        <h2 className="font-display text-2xl font-semibold text-foreground">Built for growth-stage apiaries</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          As your honey volumes increase, small tool decisions create big process differences. This set
          supports repeatable workflows, cleaner handling, and easier training for new team members.
        </p>
        <ul className="mt-6 grid gap-3 text-sm text-foreground md:grid-cols-2">
          {apiaryWorkflowTools.map((item) => (
            <li key={item} className="rounded-xl border border-border bg-card px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </section>
      </div>
    </main>
  );
}
