"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appControlFilled } from "@/lib/app-ui";
import { cn } from "@/lib/utils";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email for newsletter
      </label>
      <Input
        id="footer-newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={cn("min-w-0 flex-1 bg-[var(--surface)] dark:bg-black/40", appControlFilled)}
      />
      <Button type="submit" variant="warmOutline" className="h-11 shrink-0 px-8">
        {sent ? "Thanks" : "Join"}
      </Button>
    </form>
  );
}
