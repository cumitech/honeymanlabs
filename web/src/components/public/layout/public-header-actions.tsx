"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { cn } from "@/lib/utils";

type PublicHeaderActionsProps = {
  className?: string;
};

export function PublicHeaderActions({ className }: PublicHeaderActionsProps) {
  return (
    <div
      className={cn(
        "flex w-auto max-w-full shrink-0 items-center justify-end gap-1.5 sm:gap-2",
        className
      )}
    >
      <Link
        href="/login"
        className={cn(
          "hidden rounded-md px-2.5 py-2 text-xs font-medium text-foreground/85 sm:inline-flex",
          "transition-colors hover:bg-foreground/5 hover:text-foreground",
          "sm:px-3 sm:text-sm"
        )}
      >
        Sign in
      </Link>
      <ThemeToggle className="relative h-9 w-9 shrink-0 border-input/60" />
      <LanguageSwitcher />
    </div>
  );
}
