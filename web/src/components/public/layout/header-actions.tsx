"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/components/public/language-switcher";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import { appFocusVisible } from "@/lib/app-ui";
import { useAppTranslation } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

type HeaderActionsProps = {
  className?: string;
};

export function HeaderActions({ className }: HeaderActionsProps) {
  const { t } = useAppTranslation();

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
          "hidden rounded-lg px-2.5 py-2 text-xs font-medium text-foreground/85 md:inline-flex",
          "transition-colors hover:bg-foreground/5 hover:text-foreground",
          "md:px-3 md:text-sm",
          appFocusVisible,
        )}
      >
        {t.signIn}
      </Link>
      <div className="hidden items-center gap-1.5 sm:gap-2 md:flex">
        <ThemeToggle className="relative h-9 w-9 shrink-0 border-input/60" />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
