"use client";

import { CheckCircle2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { REGION_OPTIONS } from "@/config/cameroon-locations";
import { appControlUnderlineTinted } from "@/lib/app-ui";
import { cn } from "@/lib/utils";

const CHECKLIST = [
  "Access to Beekeeper Hub portal",
  "Bulk equipment discounts",
  "Direct payout system",
] as const;

const fieldClass = appControlUnderlineTinted;

const labelClass = "font-accent text-xs font-bold uppercase tracking-wide text-muted-foreground";

export function PartnerForm() {
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    setSent(true);
  }

  return (
    <section id="join" className="relative px-4 py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-3xl rounded-full opacity-15 blur-[100px] honey-gradient"
        aria-hidden
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-5xl flex-col gap-12 rounded-[2rem] border border-[var(--foreground)]/[0.08] bg-[var(--surface)]/95 p-8 shadow-[0_32px_80px_-40px_rgba(27,18,0,0.2)] backdrop-blur-sm md:gap-14 md:p-12 lg:flex-row lg:rounded-[2.25rem]",
        )}
      >
        <div className="lg:w-1/2">
          <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-foreground md:text-[2.75rem]">
            Partner intake
          </h2>
          <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
            Send this form; a coordinator replies from the same thread with next steps. No deposit until
            scope is agreed.
          </p>
          <ul className="space-y-4">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-4 font-medium text-foreground">
                <CheckCircle2 className="size-5 shrink-0 text-primary" strokeWidth={2} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:w-1/2">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="partner-first" className={labelClass}>
                  First name
                </Label>
                <input
                  id="partner-first"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Kwame"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="partner-last" className={labelClass}>
                  Last name
                </Label>
                <input
                  id="partner-last"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Mbia"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="partner-email" className={labelClass}>
                Email address
              </Label>
              <input
                id="partner-email"
                name="email"
                type="email"
                required
                placeholder="kwame.mbia@example.com"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="partner-region" className={labelClass}>
                Region / district
              </Label>
              <div className="relative min-w-0">
                <select
                  id="partner-region"
                  name="region"
                  required
                  className={cn(fieldClass, "cursor-pointer appearance-none pr-10")}
                >
                  {REGION_OPTIONS.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="partner-hives" className={labelClass}>
                Current hive count
              </Label>
              <input
                id="partner-hives"
                name="hiveCount"
                type="number"
                min={0}
                placeholder="e.g. 5"
                className={fieldClass}
              />
            </div>

            <div className="mt-2 flex items-start gap-3">
              <Checkbox
                id="partner-agree"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5 size-5"
                aria-required
              />
              <Label htmlFor="partner-agree" className="text-sm font-normal leading-snug text-muted-foreground">
                I agree to the network&apos;s{" "}
                <Link href="/contact" className="font-medium text-primary underline underline-offset-2">
                  sustainability guidelines
                </Link>{" "}
                and ethical harvesting standards.
              </Label>
            </div>

            <Button
              type="submit"
              variant="honey"
              disabled={!agreed || sent}
              className="mt-2 h-14 w-full text-lg font-bold shadow-xl shadow-primary/30"
            >
              {sent ? "Application received" : "Submit application"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
