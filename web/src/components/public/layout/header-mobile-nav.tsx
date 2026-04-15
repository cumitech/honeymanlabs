"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { NavLinkList } from "@/components/public/layout/header-nav";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { useAppTranslation } from "@/lib/i18n/translations";

export function HeaderMobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useAppTranslation();

  return (
    <div className="flex md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className={[
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              "border border-[var(--foreground)]/15 bg-[var(--foreground)]/[0.04]",
              "text-foreground transition-colors",
              "hover:bg-[var(--foreground)]/[0.08] focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            ].join(" ")}
            aria-expanded={open}
            aria-controls="mobile-primary-nav"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[min(100vw,20rem)] flex-col border-[var(--foreground)]/10 bg-[var(--surface)] p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b border-[var(--foreground)]/10 px-4 py-4 text-left">
            <SheetTitle className="font-accent text-[var(--accent)]">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav
            id="mobile-primary-nav"
            className="flex-1 overflow-y-auto px-2 py-4"
            aria-label="Primary"
          >
            <NavLinkList
              variant="stacked"
              onNavigate={() => setOpen(false)}
            />
          </nav>
          <div
            className={[
              "flex shrink-0 items-center justify-between gap-3 border-t border-[var(--foreground)]/10",
              "px-4 py-3",
            ].join(" ")}
          >
            <ThemeToggle className="relative h-9 w-9 shrink-0 border-input/60" />
            <div className="min-w-0 flex-1 [&_[data-slot=select-trigger]]:w-full">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="border-t border-[var(--foreground)]/10 p-4">
            <Link
              href="/login"
              className={[
                "flex w-full items-center justify-center rounded-xl px-4 py-3",
                "text-sm font-semibold text-foreground",
                "bg-[var(--foreground)]/[0.06] hover:bg-[var(--foreground)]/[0.1]",
              ].join(" ")}
              onClick={() => setOpen(false)}
            >
              {t.signIn}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
