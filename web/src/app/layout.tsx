import type { Metadata } from "next";
import React, { Suspense } from "react";
import { RefineContext } from "./_refine_context";

import { AppShell } from "@/components/public/layout/app-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://honeymanlabs.com"),
  title: {
    default: "Honeyman",
    template: "%s",
  },
  description:
    "Honeyman supports traceable honey production through field operations, quality testing, and practical education.",
  openGraph: {
    title: "Honeyman",
    description:
      "Traceable honey operations, testing workflows, and producer-focused education for consistent quality.",
    type: "website",
    siteName: "Honeyman",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honeyman",
    description:
      "Traceable honey operations, testing workflows, and producer-focused education for consistent quality.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense>
          <RefineContext>
            <div className="min-h-dvh flex flex-col bg-[var(--surface)] text-[var(--foreground)]">
              <AppShell>{children}</AppShell>
            </div>
          </RefineContext>
        </Suspense>
      </body>
    </html>
  );
}
