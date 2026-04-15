"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { appControlUnderline } from "@/lib/app-ui";
import { cn } from "@/lib/utils";

const SUBJECT_OPTIONS = [
  { value: "wholesale", label: "Wholesale & Distribution" },
  { value: "lab", label: "Quality Assurance / Lab Data" },
  { value: "sustainability", label: "Sustainability Partnerships" },
  { value: "support", label: "General Support" },
] as const;

const controlClass = appControlUnderline;

const labelClass = cn(
  "font-accent text-[10px] font-semibold uppercase tracking-[0.2em]",
  "text-muted-foreground",
);

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <form id="contact-form" onSubmit={onSubmit} className="w-full min-w-0 max-w-full space-y-10">
      <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <Label htmlFor="contact-name" className={labelClass}>
            Full Name
          </Label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={controlClass}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <Label htmlFor="contact-email" className={labelClass}>
            Email Address
          </Label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={controlClass}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="contact-subject" className={labelClass}>
          Subject of Inquiry
        </Label>
        <div className="relative min-w-0">
          <select
            id="contact-subject"
            name="subject"
            required
            className={cn(controlClass, "cursor-pointer appearance-none bg-transparent pr-10")}
            defaultValue={SUBJECT_OPTIONS[0].value}
          >
            {SUBJECT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
        </div>
      </div>

      <div className="min-w-0 space-y-2">
        <Label htmlFor="contact-message" className={labelClass}>
          Your Message
        </Label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell us how we can collaborate…"
          className={cn(controlClass, "min-h-[10.5rem] resize-y py-3 leading-relaxed")}
        />
      </div>

      <div className="flex flex-col items-stretch justify-between gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
          By submitting, you agree to our privacy policy and artisanal sourcing standards.
        </p>
        <Button
          type="submit"
          variant="honey"
          disabled={status === "sent"}
          className={cn(
            "h-auto shrink-0 px-10 py-5 font-accent text-sm uppercase tracking-widest shadow-xl",
            "hover:opacity-95 hover:shadow-lg active:scale-[0.98] disabled:opacity-70",
          )}
        >
          {status === "sent" ? "Message queued" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
