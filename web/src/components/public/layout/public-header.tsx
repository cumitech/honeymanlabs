import Image from "next/image";
import Link from "next/link";

import { PublicHeaderActions } from "@/components/public/layout/public-header-actions";
import { PublicHeaderMobileNav } from "@/components/public/layout/public-header-mobile-nav";
import { PublicHeaderNav } from "@/components/public/layout/public-header-nav";

export function PublicHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full shrink-0">
      <div className="w-full pt-0">
        <div
          className={[
            "grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-4",
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
              aria-label="HoneyMan Labs home"
            >
              <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                <Image
                  src="/logo.svg"
                  alt="HoneyMan Labs"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="font-accent text-[1.35rem] text-[var(--accent)]">
                  HoneyMan
                </div>
                <div className="text-xs text-foreground/70">Labs</div>
              </div>
            </Link>
          </div>

          <div className="col-start-2 row-start-1 flex min-w-0 items-center justify-end gap-2 md:col-start-3 md:row-start-1 md:gap-3">
            <PublicHeaderActions />
            <PublicHeaderMobileNav />
          </div>

          <div className="col-span-2 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1 md:w-full md:max-w-none md:justify-self-stretch">
            <PublicHeaderNav />
          </div>
        </div>
      </div>
    </header>
  );
}
