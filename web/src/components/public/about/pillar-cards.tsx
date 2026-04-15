import Link from "next/link";

import { AUTHORITY_PILLARS } from "@/config/authority-pillars";
import { cn } from "@/lib/utils";

export function PillarCards() {
  return (
    <section
      aria-labelledby="four-pillars-heading"
      className="relative bg-[#FFF8EC] py-24"
    >
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2
              id="four-pillars-heading"
              className="mb-2 font-display text-4xl font-bold text-[var(--foreground)]"
            >
              Four Pillars of Excellence
            </h2>
            <div className="h-1 w-32 bg-[#FFA500]" aria-hidden />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {AUTHORITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className={cn(
                  "group rounded-2xl border border-[#815100]/5 bg-white p-10 shadow-sm transition-all",
                  "hover:border-[#FFA500] hover:shadow-md",
                )}
              >
                <Icon
                  className="mb-6 block h-10 w-10 text-[#FF6B00] transition-transform group-hover:scale-105"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mb-4 font-display text-2xl font-bold text-[var(--foreground)]">
                  {pillar.title}
                </h3>
                <p className="font-sans leading-relaxed text-foreground/75">{pillar.body}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
