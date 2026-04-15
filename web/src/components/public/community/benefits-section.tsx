import { GraduationCap, Handshake, ShieldCheck } from "lucide-react";

import { COMMUNITY_BENEFITS } from "@/content/community-page";
import { cn } from "@/lib/utils";

const ICONS = [Handshake, GraduationCap, ShieldCheck] as const;

export function BenefitsSection() {
  return (
    <section id="benefits" className="border-t border-[var(--foreground)]/[0.04] bg-[var(--surface)] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            What partners get
          </h2>
          <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" aria-hidden />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Concrete support—not a slide deck. Built around how honey actually moves in Cameroon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {COMMUNITY_BENEFITS.map((b, i) => {
            const Icon = ICONS[i] ?? Handshake;
            return (
              <div
                key={b.id}
                className={cn(
                  "group flex flex-col gap-5 rounded-2xl border border-[var(--foreground)]/[0.06] bg-[var(--surface-container)]/90 p-8",
                  "shadow-[0_18px_50px_-28px_rgba(27,18,0,0.18)] transition-[transform,box-shadow,border-color] duration-300",
                  "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_24px_60px_-32px_rgba(27,18,0,0.22)]",
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--surface-container-highest)] text-primary ring-1 ring-[var(--foreground)]/[0.04] transition-colors group-hover:bg-primary/10">
                  <Icon className="size-6" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-xl font-semibold text-foreground">{b.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
