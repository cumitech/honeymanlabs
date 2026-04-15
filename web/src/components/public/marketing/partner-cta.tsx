import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

export function PartnerCta() {
  return (
    <section
      aria-labelledby="beekeeper-network-heading"
      className={cn(homeMarketingBand.bg, "pb-28 pt-10 md:pb-32 md:pt-12")}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* No stroke: depth from shadow only so it sits flush in the cream band */}
        <div
          className={cn(
            "relative overflow-hidden rounded-[2rem] md:rounded-[2.25rem]",
            "bg-gradient-to-b from-white/70 via-[#fdfaf6] to-[#f9f4e8]",
            "shadow-[0_20px_56px_-32px_rgba(35,28,18,0.09),0_2px_12px_-4px_rgba(35,28,18,0.04)]",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 55% at 20% 18%, rgba(255,165,0,0.07) 0%, transparent 52%), radial-gradient(ellipse 50% 50% at 90% 82%, rgba(129,81,0,0.05) 0%, transparent 50%)",
            }}
            aria-hidden
          />
          <div className="relative px-6 py-14 text-center md:px-14 md:py-[4.5rem] lg:px-16 lg:py-[5rem]">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9C3F00]/90 md:text-xs">
              Beekeeper network
            </p>
            <h2
              id="beekeeper-network-heading"
              className="text-balance text-3xl font-bold leading-[1.2] tracking-tight text-[#2a2218] sm:text-4xl md:text-[2.75rem] md:leading-[1.15] lg:text-[3rem] [font-family:var(--font-display)]"
            >
              Partner with the{" "}
              <span className="relative inline-block px-1">
                <span
                  className="absolute inset-0 -z-10 rounded-full bg-[#FFB800]/16 px-3 py-1.5 sm:px-5"
                  aria-hidden
                />
                <span className="relative text-[#8a4a0a]">Gold Standard</span>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[#5c4a38] sm:text-lg">
              Verified producers, lab-backed traceability, and access to buyers who care about
              purity—not just price.
            </p>

            <ul
              className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6"
              role="list"
            >
              <li className="rounded-2xl bg-white/60 px-6 py-8 shadow-[0_4px_24px_-12px_rgba(35,28,18,0.08)] backdrop-blur-sm">
                <p
                  className="bg-gradient-to-r from-[#e67a00] to-[#f0a832] bg-clip-text text-3xl font-bold tabular-nums text-transparent md:text-4xl"
                  aria-label="100 percent lab-verified"
                >
                  100%
                </p>
                <p className="mt-2.5 text-sm font-medium leading-snug text-[#2a2218]">
                  Lab-verified batches
                </p>
              </li>
              <li className="rounded-2xl bg-white/60 px-6 py-8 shadow-[0_4px_24px_-12px_rgba(35,28,18,0.08)] backdrop-blur-sm">
                <p
                  className="bg-gradient-to-r from-[#d45a00] to-[#f5a020] bg-clip-text text-3xl font-bold tabular-nums text-transparent md:text-4xl"
                  aria-label="More than 50 farm and hive products"
                >
                  50+
                </p>
                <p className="mt-2.5 text-sm font-medium leading-snug text-[#2a2218]">
                  Farm & hive products
                </p>
              </li>
              <li className="rounded-2xl bg-white/60 px-6 py-8 shadow-[0_4px_24px_-12px_rgba(35,28,18,0.08)] backdrop-blur-sm">
                <p
                  className="bg-gradient-to-r from-[#6b4a0a] to-[#b8892e] bg-clip-text text-3xl font-bold tabular-nums text-transparent md:text-4xl"
                  aria-label="More than 12 regions represented"
                >
                  12+
                </p>
                <p className="mt-2.5 text-sm font-medium leading-snug text-[#2a2218]">
                  Regions represented
                </p>
              </li>
            </ul>

            <p className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#6b5c4d]">
              Join the network to unlock testing workflows, export-ready documentation, and a
              partner that grows with your harvest.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5 sm:mt-12">
              <Link
                href="/community"
                className={cn(
                  "inline-flex items-center gap-2.5 rounded-full px-10 py-3.5 text-sm font-semibold",
                  "bg-[linear-gradient(135deg,#FFD875_0%,#E89420_48%,#b84a08_100%)] text-[#1a1208]",
                  "shadow-[0_12px_36px_-14px_rgba(190,110,30,0.38)] transition-[transform,box-shadow,filter] duration-300",
                  "hover:-translate-y-px hover:shadow-[0_16px_44px_-16px_rgba(190,110,30,0.42)] hover:brightness-[1.02]",
                  "active:translate-y-0 sm:px-12 sm:py-4 sm:text-base",
                )}
              >
                Join the Network
                <ArrowRight className="h-4 w-4 opacity-90" strokeWidth={2.5} aria-hidden />
              </Link>
              <Link
                href="/honey-testing-lab"
                className="text-sm font-semibold text-[#815100] underline-offset-4 transition-colors hover:text-[#5c3d0a] hover:underline"
              >
                View lab criteria
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
