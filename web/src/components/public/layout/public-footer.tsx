import Image from "next/image";
import Link from "next/link";

import { publicNavItems } from "@/config/public-nav";

export function PublicFooter() {
  return (
    <footer className="mt-16">
      <div className="bg-[var(--surface-container-low)] py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                  <Image
                    src="/logo.svg"
                    alt="HoneyMan Labs"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="leading-tight">
                  <div className="font-accent text-[1.35rem] text-[var(--accent)]">
                    HONEYMAN
                  </div>
                  <div className="text-xs text-foreground/70">Labs</div>
                </div>
              </div>
              <p className="text-sm text-foreground/70 max-w-sm">
                Warm heritage. Enterprise-grade traceability. Luxury honey, verified
                end-to-end.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-accent text-sm text-[var(--accent)]">
                Explore
              </div>
              <div className="flex flex-col gap-2 text-sm text-foreground/70">
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-accent text-sm text-[var(--accent)]">
                Notes
              </div>
              <div className="text-sm text-foreground/70 space-y-2">
                <div>
                  <span className="font-semibold text-foreground/85">
                    CERTIFIED PURE
                  </span>{" "}
                  for business use-cases and premium retail.
                </div>
                <div>
                  <span className="font-semibold text-foreground/85">
                    VERIFIED QUALITY
                  </span>{" "}
                  with consistent batch documentation.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="text-xs text-foreground/60">
              © {new Date().getFullYear()} HoneyMan Labs. All rights reserved.
            </div>
            <div className="text-xs text-foreground/60">
              Built with warm, editorial typography and glassmorphism.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

