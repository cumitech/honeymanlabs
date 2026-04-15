"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/public/layout/site-footer";
import { SiteHeader } from "@/components/public/layout/site-header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isHome = pathname === "/";

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      {isHome ? null : <SiteHeader />}
      {children}
      <SiteFooter />
    </>
  );
}
