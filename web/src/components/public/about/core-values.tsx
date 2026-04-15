import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    n: "01",
    title: "Unwavering Purity",
    body: 'We reject unnecessary heat treatment. Our honey is "alive," handled to maintain a complex, natural profile.',
  },
  {
    n: "02",
    title: "Radical Transparency",
    body: "Traceability ties each batch to provenance, altitude context, and laboratory documentation you can trust.",
  },
  {
    n: "03",
    title: "Economic Empowerment",
    body: "We shorten opaque supply chains so producers capture more value—protecting craft, forests, and the next harvest.",
  },
] as const;

export function CoreValues() {
  return (
    <section aria-labelledby="foundation-heading" className={cn("py-24 md:py-32", homeMarketingBand.bg)}>
      <div
        className={cn(
          "mx-auto mb-16 max-w-7xl px-6 text-center md:mb-20 md:px-8",
          homeMarketingBand.bodyText,
          "dark:text-stone-100",
        )}
      >
        <h2
          id="foundation-heading"
          className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Foundation of the Hive
        </h2>
        <p className={cn("font-sans italic", homeMarketingBand.muted, "dark:text-stone-400")}>
          The pillars that uphold every batch we produce.
        </p>
      </div>
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-3 md:gap-16 md:px-8",
          homeMarketingBand.bodyText,
          "dark:text-stone-100",
        )}
      >
        {VALUES.map((v) => (
          <div key={v.n} className="group text-left">
            <div className="mb-6 font-display text-6xl text-[#c9a227]/35 transition-colors group-hover:text-[#B8860B]/60 dark:text-amber-400/30 dark:group-hover:text-amber-400/55">
              {v.n}
            </div>
            <h4 className="font-accent mb-4 text-xl uppercase tracking-wider">{v.title}</h4>
            <div
              className={cn(
                "mb-6 h-0.5 w-full origin-left bg-[#4B2E1E]/15 transition-all duration-500 group-hover:bg-[#c9a227]/70 dark:bg-stone-600/45 dark:group-hover:bg-amber-400/60",
              )}
            />
            <p className={cn("leading-relaxed", homeMarketingBand.muted, "dark:text-stone-400")}>{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
