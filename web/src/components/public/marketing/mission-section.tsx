import { BadgeCheck, Brain, Leaf } from "lucide-react";

import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

export function MissionSection() {
  return (
    <section
      aria-labelledby="mission-heading"
      id="our-story"
      className={homeMarketingBand.bg}
    >
      <div className="container mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 md:px-10 md:py-28 lg:py-32">
        <span className="font-accent mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-[#9C3F00] sm:text-sm sm:tracking-[0.35em]">
          Our mission
        </span>
        <h2
          id="mission-heading"
          className="mb-10 text-4xl font-bold leading-[1.15] text-[#312E27] sm:mb-12 sm:text-5xl md:text-[3.25rem] md:leading-tight [font-family:var(--font-display)]"
        >
          Tradition and lab work on the same label
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-[1.75] text-[#5c4a38] sm:text-xl sm:leading-relaxed md:text-[1.35rem] md:leading-[1.7]">
          We buy and move honey the slow way: provenance noted, moisture and acidity checked where it
          counts, and pricing agreed before drums leave the yard. Cameroonian beekeepers get paid on
          schedule; buyers get paperwork they can stand behind.
        </p>
        <div className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:mt-20 md:gap-x-14">
          <div className="flex items-center gap-3.5">
            <BadgeCheck
              className="h-7 w-7 shrink-0 text-[var(--primary)] sm:h-8 sm:w-8"
              aria-hidden
            />
            <span className="text-left text-sm font-semibold tracking-tight text-[#2a2218] sm:text-base">
              Traceable batches
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <Brain className="h-7 w-7 shrink-0 text-[var(--primary)] sm:h-8 sm:w-8" aria-hidden />
            <span className="text-left text-sm font-semibold tracking-tight text-[#2a2218] sm:text-base">
              Lab workflows
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            <Leaf className="h-7 w-7 shrink-0 text-[var(--primary)] sm:h-8 sm:w-8" aria-hidden />
            <span className="text-left text-sm font-semibold tracking-tight text-[#2a2218] sm:text-base">
              Field partnerships
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
