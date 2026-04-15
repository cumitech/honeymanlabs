import Image from "next/image";

import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

const panel =
  "rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 p-3 shadow-sm backdrop-blur-[2px]";

export function AboutStory() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className={cn("relative overflow-hidden py-20 md:py-24", homeMarketingBand.bg)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#fdf9f3] to-transparent dark:from-[#14100d]" aria-hidden />
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f1e4cb]/35 dark:to-stone-900/40"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-12 md:gap-14 md:px-8">
        <div className="md:sticky md:top-28 md:col-span-5">
          <h2
            id="about-story-heading"
            className="mb-6 font-display text-3xl font-semibold tracking-tight text-[#2a2218] md:text-4xl"
          >
            Bridging Two Worlds
          </h2>
          <p className="mb-4 font-accent text-xs uppercase tracking-[0.22em] text-[#B8860B] dark:text-amber-400/90">
            Heritage + verification
          </p>
          <div className="space-y-5 font-sans text-lg leading-relaxed text-[#5c4a38] dark:text-stone-400">
            <p>
              Honeyman starts at the hive with beekeepers who know their terrain, flowering seasons, and
              harvest rhythm. We preserve that field wisdom while applying structured quality controls that
              global buyers can trust.
            </p>
            <p>
              Every lot is tracked from collection to shipment, documented with producer records and lab
              checkpoints. The result is honey that remains true to origin and ready for professional
              procurement standards.
            </p>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-[#6b5a47] dark:text-stone-400">
            <li>- Source-verified batches with partner records.</li>
            <li>- Lab-backed quality checks for moisture and purity.</li>
            <li>- Export-ready documentation for buyer confidence.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-0 md:col-span-7 md:grid-cols-2 md:pt-8">
          <article className={cn(panel, "md:row-span-2 dark:border-stone-600/30 dark:bg-stone-900/45")}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/local-honey-9061428_1280.png"
                alt="Fresh local honey presented in jars ready for quality review"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 34vw"
              />
            </div>
            <div className="mt-3 rounded-lg bg-[#f9f1e3] px-4 py-3 text-sm text-[#5c4a38] dark:bg-stone-800/60 dark:text-stone-300">
              Flagship lots are selected for floral clarity, handling consistency, and buyer-specific
              quality requirements.
            </div>
          </article>

          <article className={cn(panel, "dark:border-stone-600/30 dark:bg-stone-900/45")}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/photo-1549269459-ba9e31874ef2.jpg"
                alt="Beekeeper inspecting active hives in the field"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 30vw"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4a38] dark:text-stone-300">
              Field collection follows seasonal harvest windows and handling protocols designed to protect
              natural enzymes.
            </p>
          </article>

          <article className={cn(panel, "dark:border-stone-600/30 dark:bg-stone-900/45")}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/photo-1590334280707-9d5e0f60a539.jpg"
                alt="Honey and comb sample prepared for verification and profiling"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, 30vw"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4a38] dark:text-stone-300">
              Batch profiling and documentation connect each shipment to provenance, test logs, and
              compliance paperwork.
            </p>
          </article>
        </div>

        <div className="md:col-span-12">
          <div className="mt-2 grid grid-cols-1 gap-3 rounded-2xl border border-[#4B2E1E]/[0.08] bg-[#fffdf8]/75 p-4 text-sm text-[#5c4a38] shadow-sm sm:grid-cols-3 dark:border-stone-600/30 dark:bg-stone-900/45 dark:text-stone-300">
            <div className="rounded-lg bg-[#f9f1e3] px-3 py-2 text-center dark:bg-stone-800/65">
              <p className="font-accent uppercase tracking-[0.16em] text-[#9A6B2D] dark:text-amber-400/90">Field origin</p>
              <p className="mt-1">Producer + harvest context</p>
            </div>
            <div className="rounded-lg bg-[#f9f1e3] px-3 py-2 text-center dark:bg-stone-800/65">
              <p className="font-accent uppercase tracking-[0.16em] text-[#9A6B2D] dark:text-amber-400/90">Lab validation</p>
              <p className="mt-1">Moisture, purity, and profile</p>
            </div>
            <div className="rounded-lg bg-[#f9f1e3] px-3 py-2 text-center dark:bg-stone-800/65">
              <p className="font-accent uppercase tracking-[0.16em] text-[#9A6B2D] dark:text-amber-400/90">Buyer readiness</p>
              <p className="mt-1">Traceability and export files</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
