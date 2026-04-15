import Image from "next/image";

import { ABOUT_TEAM } from "@/content/about-team";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

export function TeamSection() {
  return (
    <section
      aria-labelledby="custodians-heading"
      className={cn("border-t border-[#4B2E1E]/[0.08] py-20 md:py-24 dark:border-stone-600/25", homeMarketingBand.bg)}
    >
      <div className={cn("mx-auto max-w-7xl px-6 md:px-8", homeMarketingBand.bodyText, "dark:text-stone-100")}>
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <h2 id="custodians-heading" className="mb-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              The Custodians
            </h2>
            <p className={cn("font-sans", homeMarketingBand.muted, "dark:text-stone-400")}>
              The minds and hands behind Honeyman.
            </p>
          </div>
          <p className="hidden font-display text-lg italic text-[#B8860B] md:block dark:text-amber-400/90">
            &ldquo;Nature&apos;s architecture, human precision.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {ABOUT_TEAM.map((m) => (
            <div key={m.id} className={cn("space-y-4", m.stagger && "md:mt-12")}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#4B2E1E]/[0.08] bg-[#fffdf8]/85 shadow-sm dark:border-stone-600/30 dark:bg-stone-900/40">
                <Image
                  src={m.imageSrc}
                  alt={m.imageAlt}
                  fill
                  className={cn(
                    "grayscale transition-all duration-700 hover:grayscale-0",
                    m.imageClassName ?? "object-cover",
                  )}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div>
                <h5 className="font-display text-xl">{m.name}</h5>
                <p className="font-accent text-[10px] uppercase tracking-widest text-[#B8860B] dark:text-amber-400/90">
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
