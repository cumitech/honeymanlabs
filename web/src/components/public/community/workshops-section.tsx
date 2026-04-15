import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { COMMUNITY_EVENTS } from "@/content/community-page";
import { cn } from "@/lib/utils";

export function WorkshopsSection() {
  return (
    <section id="events" className="border-t border-[var(--foreground)]/[0.04] px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Workshops</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              Small-group sessions—bring your logbook. Dates shift with the season; confirm by email.
            </p>
          </div>
          <Link
            href="/education"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-4 transition-colors hover:underline"
          >
            Education overview
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="space-y-3">
          {COMMUNITY_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className={cn(
                "flex flex-col justify-between gap-5 rounded-2xl border border-[var(--foreground)]/[0.06] bg-[var(--surface)]/95 p-6",
                "shadow-[0_12px_40px_-24px_rgba(27,18,0,0.12)] transition-[border-color,box-shadow] duration-200",
                "hover:border-primary/30 hover:shadow-[0_16px_48px_-28px_rgba(27,18,0,0.16)] md:flex-row md:items-center",
              )}
            >
              <div className="flex items-center gap-5">
                <div className="flex size-[4.25rem] shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--surface-container-low)] font-accent text-primary ring-1 ring-[var(--foreground)]/[0.04]">
                  <span className="text-xl font-bold leading-none">{ev.day}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {ev.month}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{ev.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 opacity-80" aria-hidden />
                    {ev.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-[var(--surface-container-low)]/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary/80" aria-hidden />
                  {ev.badge}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-xl font-semibold shadow-none transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Request a seat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
