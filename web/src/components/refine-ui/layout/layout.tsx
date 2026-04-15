"use client";

import { Header } from "@/components/refine-ui/layout/header";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset className="bg-gradient-to-b from-[var(--surface)] via-[var(--surface-glass)]/35 to-[var(--surface)]">
          <Header />
          <main
            className={cn(
              "@container/main",
              "container",
              "mx-auto",
              "relative",
              "w-full",
              "flex",
              "flex-col",
              "flex-1",
              // "rounded-2xl",
              // "border",
              // "border-[var(--foreground)]/[0.08]",
              // "bg-[var(--surface)]/75",
              "backdrop-blur-sm",
              "shadow-[0_20px_60px_-40px_rgba(255,165,0,0.45)]",
              "px-3",
              "pt-3",
              "sm:px-8",
              "sm:pt-4",
              "md:px-15",
              "md:pt-7.5",
              "lg:px-30",
              "lg:pt-15"
            )}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(255,165,0,0.12),transparent_45%)]" />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = "Layout";
