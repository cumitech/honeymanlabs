import Image from "next/image";
import Link from "next/link";

import { HeaderActions } from "@/components/public/layout/header-actions";
import { brandLogoBoxClassName } from "@/config/brand-logo";
import { cn } from "@/lib/utils";
import { HeaderMobileNav } from "@/components/public/layout/header-mobile-nav";
import { HeaderNav } from "@/components/public/layout/header-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full shrink-0">
      <div className="w-full pt-0">
        <div
          className={[
            "grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-0",
            "rounded-none bg-[var(--surface-glass)]/85 backdrop-blur-xl",
            "shadow-[0_30px_80px_-60px_rgba(255,165,0,0.65)]",
            "border-b border-[var(--foreground)]/[0.06]",
            "px-4 py-3 sm:px-6 lg:px-8",
            "md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-x-6 md:gap-y-0",
          ].join(" ")}
        >
          <div className="col-start-1 row-start-1 flex min-w-0 justify-start md:col-start-1 md:row-start-1">
            <Link
              href="/"
              className="flex min-w-0 shrink-0 items-center gap-3"
              aria-label="Honeyman home"
            >
              <div className={cn("relative", brandLogoBoxClassName)}>
                <Image
                  src="/logo.svg"
                  alt="Honeyman"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="font-accent text-[1.35rem] text-[var(--accent)]">
                  Honeyman
                </div>
              </div>
            </Link>
          </div>

          <div className="col-start-2 row-start-1 flex min-w-0 items-center justify-end gap-2 md:col-start-3 md:row-start-1 md:gap-3">
            <HeaderActions />
            <HeaderMobileNav />
          </div>

          <div className="hidden min-w-0 md:col-span-1 md:col-start-2 md:row-start-1 md:block md:w-full md:max-w-none md:justify-self-stretch">
            <HeaderNav />
          </div>
        </div>
      </div>
    </header>
  );
}
