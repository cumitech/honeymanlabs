import type { Metadata } from "next";
import { Beaker, CheckCircle2, Globe, Leaf, QrCode, ShieldCheck, TestTube2 } from "lucide-react";

import { PageHero } from "@/components/public/layout/page-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type LabTestRecord = {
  id: string;
  test_type: string;
  status: string;
};

const trustPoints = [
  { icon: Beaker, label: "ISO 17025 Certified" },
  { icon: Leaf, label: "Organic Export Grade" },
  { icon: ShieldCheck, label: "Adulteration Free" },
  { icon: Globe, label: "Global Traceability" },
];

const defaultServiceCards = [
  {
    icon: TestTube2,
    title: "Moisture Testing",
    summary:
      "Refractometry to keep moisture levels below 18%, reducing fermentation risk and improving shelf stability.",
  },
  {
    icon: Beaker,
    title: "HMF Analysis",
    summary:
      "Hydroxymethylfurfural analysis verifies freshness and helps confirm the honey has not been heat-damaged.",
  },
  {
    icon: Leaf,
    title: "Pollen Analysis",
    summary:
      "Microscopic melissopalynology confirms floral origins and links products to Cameroonian source regions.",
  },
  {
    icon: ShieldCheck,
    title: "Purity Testing",
    summary:
      "Advanced screening for added sugars and residues using methods aligned with international buyer requirements.",
  },
];

const valuePoints = [
  {
    title: "Market Access",
    description: "Meet strict FDA and EU regulatory requirements for export-ready honey.",
  },
  {
    title: "Price Premium",
    description: "Certified pure honey can command stronger pricing than unverified yields.",
  },
];

const testSuites = ["Full Purity Suite", "Export Baseline", "Moisture Only", "HMF Analysis"];

export const metadata: Metadata = {
  title: "Honey Testing Lab · Honeyman",
  description:
    "Certified honey testing services for producers and exporters, including purity checks, moisture analysis, and traceable lab reports.",
  alternates: {
    canonical: "/honey-testing-lab",
  },
};

async function fetchDynamicServiceCards() {
  try {
    const response = await fetch(`${APP_API_URL}/lab_tests`, {
      next: { revalidate: 120 },
      headers: { "X-Language": "en" },
    });
    if (!response.ok) return defaultServiceCards;
    const tests = (await response.json()) as LabTestRecord[];
    const uniqueTypes = Array.from(new Set(tests.map((item) => item.test_type).filter(Boolean))).slice(0, 4);
    if (uniqueTypes.length === 0) return defaultServiceCards;
    return uniqueTypes.map((testType, index) => ({
      icon: [TestTube2, Beaker, Leaf, ShieldCheck][index] ?? TestTube2,
      title: testType,
      summary:
        "Live testing workflow available through the Honeyman lab network for quality and traceability verification.",
    }));
  } catch {
    return defaultServiceCards;
  }
}

export default async function HoneyTestingLabPage() {
  const serviceCards = await fetchDynamicServiceCards();
  const labHeroImage = "/images/premium_photo-1664273586606-d7c9804729c2.jpg";
  const warmCard =
    "rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 shadow-sm backdrop-blur-[2px] dark:border-stone-600/30 dark:bg-stone-900/45";

  return (
    <main className="relative mx-auto w-full max-w-7xl overflow-hidden pb-16 text-[#2a2218] dark:text-stone-100">
      <PageHero
        eyebrow="Certified Cameroon quality"
        headingId="lab-hero-heading"
        title="The gold standard for purity"
        description="At Honeyman, we do more than sell honey. Our laboratory team verifies each batch using modern analytical methods so every shipment can meet strict export expectations."
        imageSrc={labHeroImage}
        imageAlt="Close up of clinical laboratory testing equipment with amber liquid"
        imagePriority
        className="border-b-0 pb-2 md:pb-3"
        cta={{ href: "#lab-request", label: "Submit sample" }}
        ctaSecondary={{ href: "#lab-services", label: "View services" }}
      />

      <section className="py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 grayscale transition-all duration-500 hover:grayscale-0 md:px-8">
          {trustPoints.map((item) => (
            <div key={item.label} className="flex items-center gap-2 opacity-90">
              <item.icon className="h-6 w-6 text-[#B8860B] dark:text-amber-400/90" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#5c4a38] dark:text-stone-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="lab-services" className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="mb-4 font-display text-4xl italic text-[#9A6B2D] md:text-5xl dark:text-amber-400/90">
              Precision Analysis Services
            </h2>
            <p className="max-w-xl text-[#5c4a38] dark:text-stone-400">
              Comprehensive testing suites designed for beekeepers, exporters, and retail partners.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service, index) => (
              <article
                key={service.title}
                className={cn(
                  "rounded-xl border p-8 transition-all hover:border-[#B8860B]/35",
                  warmCard,
                  index % 2 === 0 ? "bg-[#fffdf8]/92" : "bg-[#f9f1e3]/80 dark:bg-stone-900/55",
                )}
              >
                <service.icon className="mb-6 h-9 w-9 text-[#B8860B] dark:text-amber-400/90" />
                <h3 className="mb-3 font-display text-2xl italic text-[#9A6B2D] dark:text-amber-400/90">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5c4a38] dark:text-stone-400">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="mb-5 font-display text-4xl italic text-[#9A6B2D] dark:text-amber-400/90">
                Why Scientific Verification Matters
              </h2>
              <p className="mb-6 leading-relaxed text-[#5c4a38] dark:text-stone-400">
                In global markets, honey fraud remains a barrier for many producers. Clear testing
                results provide the technical evidence required for premium placement in European and
                North American channels.
              </p>
              <ul className="space-y-4">
                {valuePoints.map((point) => (
                  <li key={point.title} className="flex items-start gap-3">
                    <span className="rounded bg-[#B8860B]/15 p-1">
                      <CheckCircle2 className="h-4 w-4 text-[#B8860B] dark:text-amber-400/90" />
                    </span>
                    <div>
                      <span className="block font-bold text-[#9A6B2D] dark:text-amber-400/90">{point.title}</span>
                      <span className="text-sm text-[#5c4a38] dark:text-stone-400">{point.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className={cn("rounded-xl border-l-4 border-[#B8860B] p-7", warmCard)}>
              <p className="font-display text-xl italic text-[#9A6B2D] dark:text-amber-400/90">
                &ldquo;Testing is not only about safety. It is about honoring the work of the bees and the
                beekeepers.&rdquo;
              </p>
              <footer className="mt-4 text-xs font-bold uppercase tracking-widest text-[#5c4a38] dark:text-stone-400">
                Chief Lab Scientist, Honeyman
              </footer>
            </blockquote>
          </div>

          <div
            id="lab-request"
            className={cn(
              "relative overflow-hidden rounded-3xl border p-8 shadow-2xl md:p-12 lg:col-span-7",
              "border-[#4B2E1E]/10 bg-[#fffdf8]/92 dark:border-stone-600/30 dark:bg-stone-900/55",
            )}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-r from-amber-400 to-orange-600 opacity-15 blur-3xl" />
            <div className="relative z-10">
              <h3 className="mb-2 font-display text-3xl italic text-[#9A6B2D] dark:text-amber-400/90">
                Request Lab Analysis
              </h3>
              <p className="mb-8 text-sm text-[#5c4a38] dark:text-stone-400">
                Fill out the form to begin the sample submission process.
              </p>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="space-y-1 text-xs uppercase tracking-widest text-[#6b5a47] dark:text-stone-400">
                    Full Name
                    <input
                      className="w-full border-b border-[#4B2E1E]/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-[#B8860B] dark:border-stone-600/50 dark:text-stone-100"
                      placeholder="Enter your name"
                      type="text"
                    />
                  </label>
                  <label className="space-y-1 text-xs uppercase tracking-widest text-[#6b5a47] dark:text-stone-400">
                    Location (Town/Region)
                    <input
                      className="w-full border-b border-[#4B2E1E]/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-[#B8860B] dark:border-stone-600/50 dark:text-stone-100"
                      placeholder="e.g. Adamaoua Region"
                      type="text"
                    />
                  </label>
                </div>

                <label className="space-y-1 text-xs uppercase tracking-widest text-[#6b5a47] dark:text-stone-400">
                  Honey Source
                  <select className="w-full appearance-none border-b border-[#4B2E1E]/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-[#B8860B] dark:border-stone-600/50 dark:text-stone-100">
                    <option>Forest Wild Harvest</option>
                    <option>Savannah Blossom</option>
                    <option>Commercial Apiary</option>
                    <option>Other</option>
                  </select>
                </label>

                <fieldset className="space-y-2">
                  <legend className="text-xs uppercase tracking-widest text-[#6b5a47] dark:text-stone-400">
                    Requested Test Suite
                  </legend>
                  <div className="grid gap-4 pt-1 md:grid-cols-2">
                    {testSuites.map((suite) => (
                      <label
                        key={suite}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#4B2E1E]/10 p-3 text-sm transition-colors hover:bg-[#f9f1e3]/70 dark:border-stone-600/40 dark:hover:bg-stone-800/40"
                      >
                        <input type="checkbox" className="h-4 w-4 rounded border-[#4B2E1E]/25 accent-[#B8860B]" />
                        <span className="font-medium">{suite}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="pt-4">
                  <Button className="h-11 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-600 text-base font-bold text-black hover:opacity-90">
                    Generate Submission Ticket
                  </Button>
                  <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-[#6b5a47] dark:text-stone-400">
                    Response time: usually within 24 lab hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-600">
              <QrCode className="h-5 w-5 text-black" />
            </div>
            <div>
              <h4 className="font-bold text-[#9A6B2D] dark:text-amber-400/90">Live Batch Tracking</h4>
              <p className="text-sm text-[#5c4a38] dark:text-stone-400">
                Every Honeyman jar carries a unique ID linked to its lab report.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#4B2E1E]/10 bg-[#fffdf8]/85 px-4 py-2 dark:border-stone-600/30 dark:bg-stone-900/50">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#B8860B]" />
            <span className="text-xs font-bold uppercase tracking-tight">Verified system status: Online</span>
          </div>
        </div>
      </section>
    </main>
  );
}
