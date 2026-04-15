import Image from "next/image";
import { Quote } from "lucide-react";

import { publicImages } from "@/config/public-media";
import { cn } from "@/lib/utils";

const quoteCard =
  "rounded-2xl border border-[var(--foreground)]/[0.07] bg-[var(--surface)]/92 p-5 shadow-[0_20px_50px_-28px_rgba(27,18,0,0.2)] backdrop-blur-sm md:p-6";

export function StoriesSection() {
  return (
    <section
      id="stories"
      className="relative my-10 overflow-hidden rounded-[2rem] border border-[var(--foreground)]/[0.05] bg-[var(--surface-container-low)]/90 px-4 py-16 md:my-12 md:py-20"
    >
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 opacity-[0.06]"
        aria-hidden
      >
        <Image
          src={publicImages.honeyJarCutout.src}
          alt=""
          fill
          className="object-contain"
          sizes="320px"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl md:mb-14">
          <span className="font-accent text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
            From the field
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            What people told us
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Paraphrased from partner calls—names and places are representative.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-stretch">
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] min-h-[280px] overflow-hidden rounded-3xl shadow-[0_28px_70px_-36px_rgba(27,18,0,0.35)] ring-1 ring-[var(--foreground)]/[0.06] sm:aspect-square lg:min-h-0">
              <Image
                src={publicImages.beekeeperField.src}
                alt={publicImages.beekeeperField.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--foreground)]/70 to-transparent p-1 pb-5 pt-24 md:pb-6">
                <div className={cn("mx-4 md:mx-6", quoteCard)}>
                  <p className="mb-4 text-base italic leading-relaxed text-foreground md:text-lg">
                    &ldquo;When the floor price was written in the contract, I stopped guessing what each drum
                    would earn.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Samuel N.</p>
                      <p className="text-xs text-muted-foreground">West Region</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div
              className={cn(
                "rounded-3xl border-l-[3px] border-primary bg-[var(--surface)]/95 p-8 shadow-sm ring-1 ring-[var(--foreground)]/[0.05]",
              )}
            >
              <Quote className="mb-4 h-9 w-9 text-primary/90" strokeWidth={1.25} aria-hidden />
              <p className="mb-6 text-lg font-medium leading-relaxed text-muted-foreground">
                &ldquo;Buyers stopped arguing about quality once the lab PDF sat next to the invoice.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[var(--surface-container-highest)] ring-2 ring-primary/15">
                  <Image
                    src={publicImages.honeyJarCutout.src}
                    alt=""
                    fill
                    className="object-contain object-center p-1.5"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Marie-Louise K.</p>
                  <p className="text-sm text-muted-foreground">Export coordinator</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-2xl border border-[var(--foreground)]/[0.05] bg-[var(--surface-container-highest)]/80 p-6">
                <span className="font-display text-3xl font-bold text-primary">45%</span>
                <span className="text-xs font-medium leading-snug text-muted-foreground">
                  Reported income lift after first season on programme pricing
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-[var(--foreground)]/[0.05] bg-[var(--surface-container-highest)]/80 p-6">
                <span className="font-display text-3xl font-bold text-primary">120+</span>
                <span className="text-xs font-medium leading-snug text-muted-foreground">
                  Hives logged with new frames &amp; tags in pilot districts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
