import type { PropsWithChildren } from "react";

import { PublicFooter } from "@/components/public/layout/public-footer";
import { PublicHeader } from "@/components/public/layout/public-header";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--surface)] text-[var(--foreground)]">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}

