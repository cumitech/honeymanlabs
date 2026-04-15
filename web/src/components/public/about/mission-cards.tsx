import { Eye, Sparkles } from "lucide-react";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

const missionCard =
  "flex-1 rounded-2xl border border-[#4B2E1E]/[0.1] bg-[#fffdf8]/90 p-10 shadow-sm backdrop-blur-[2px] md:p-12 dark:border-stone-600/30 dark:bg-stone-900/45";

export function MissionCards() {
  return (
    <section
      aria-labelledby="mission-vision-heading"
      className={cn("py-20 md:py-24", homeMarketingBand.bg)}
    >
      <h2 id="mission-vision-heading" className="sr-only">
        Mission and vision
      </h2>
      <div className={cn("mx-auto max-w-7xl px-6 md:px-8", homeMarketingBand.bodyText, "dark:text-stone-100")}>
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          <div className={cn(missionCard, "border-[#9A6B2D]/20")}>
            <Sparkles className="mb-6 h-10 w-10 text-[#B8860B] dark:text-amber-400/90" strokeWidth={1.25} aria-hidden />
            <h3 className="mb-4 font-display text-3xl font-semibold italic tracking-tight">Our Mission</h3>
            <p className={cn("font-sans text-lg leading-relaxed", homeMarketingBand.muted, "dark:text-stone-400")}>
              To elevate Cameroonian artisanal honey on the global stage—giving beekeepers fair pathways
              and giving consumers absolute botanical clarity.
            </p>
          </div>
          <div className={cn(missionCard, "md:mt-16")}>
            <Eye className="mb-6 h-10 w-10 text-[#9A6B2D] dark:text-amber-400/85" strokeWidth={1.25} aria-hidden />
            <h3 className="mb-4 font-display text-3xl font-semibold italic tracking-tight">Our Vision</h3>
            <p className={cn("font-sans text-lg leading-relaxed", homeMarketingBand.muted, "dark:text-stone-400")}>
              To become a reference for traceable, verified honey—proving that luxury quality can rest on
              radical transparency and community empowerment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
