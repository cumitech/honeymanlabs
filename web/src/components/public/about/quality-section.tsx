import { MapPin, Microscope, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Microscope, label: "Lab Testing" },
  { icon: ShieldCheck, label: "Certified Pure" },
  { icon: MapPin, label: "Local Sourcing" },
] as const;

export function QualitySection() {
  return (
    <section
      aria-labelledby="we-test-heading"
      className="border-y border-[#815100]/5 bg-white py-20"
    >
      <div className="container mx-auto max-w-5xl px-8 text-center">
        <h2
          id="we-test-heading"
          className="mb-12 font-display text-4xl font-bold italic text-[#815100] md:text-5xl"
        >
          We Test What We Sell
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFA500]/10">
                <Icon className="h-8 w-8 text-[#FFA500]" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="font-sans font-bold text-[#312E27]">{label}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-2xl border-t border-[#815100]/10 pt-8 font-sans text-base leading-relaxed text-foreground/70">
          Every Honeyman product is verified for purity, composition, and geographic origin by
          accredited third-party specialists.
        </p>
      </div>
    </section>
  );
}
