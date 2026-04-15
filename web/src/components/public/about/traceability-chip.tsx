import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

export function TraceabilityChip() {
  return (
    <div className={cn("flex justify-center pb-20 md:pb-24", homeMarketingBand.bg)}>
      <div className="inline-flex cursor-default items-center gap-3 rounded-full border border-[#4B2E1E]/[0.12] bg-[#fffdf8]/95 px-6 py-3 shadow-sm backdrop-blur-[2px] transition-shadow hover:shadow-md dark:border-stone-600/30 dark:bg-stone-900/55">
        <span
          className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#B8860B] dark:bg-amber-400/90"
          aria-hidden
        />
        <span className="font-accent text-xs uppercase tracking-widest text-[#9A6B2D] dark:text-amber-400/90">
          Traceability verified
        </span>
      </div>
    </div>
  );
}
