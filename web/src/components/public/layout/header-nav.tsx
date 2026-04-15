"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { publicNavItems } from "@/config/public-nav";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinkListProps = {
  variant: "inline" | "stacked";
  onNavigate?: () => void;
  className?: string;
};

export function NavLinkList({
  variant,
  onNavigate,
  className,
}: NavLinkListProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        variant === "inline"
          ? [
              "flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2",
              "text-xs sm:text-sm",
              "md:gap-x-4 lg:gap-x-5",
            ].join(" ")
          : "flex flex-col gap-0.5 p-1",
        className,
      )}
    >
      {publicNavItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => onNavigate?.()}
              className={cn(
                "block transition-colors",
                variant === "inline"
                  ? [
                      "whitespace-nowrap",
                      active
                        ? "font-medium text-foreground underline decoration-[var(--accent)] decoration-2 underline-offset-[10px]"
                        : "text-foreground/75 hover:text-foreground",
                    ].join(" ")
                  : [
                      "rounded-lg px-3 py-3 text-base font-medium",
                      active
                        ? "bg-[var(--foreground)]/[0.06] text-foreground"
                        : "text-foreground/80 hover:bg-[var(--foreground)]/[0.06] hover:text-foreground",
                    ].join(" "),
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function HeaderNav() {
  return (
    <nav
      className="hidden w-full min-w-0 justify-center md:flex md:max-w-none"
      aria-label="Primary"
    >
      <NavLinkList variant="inline" />
    </nav>
  );
}
