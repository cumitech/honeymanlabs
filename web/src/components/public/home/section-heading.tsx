import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  icon: LucideIcon;
  className?: string;
  /** Warm brown + gold only (home marketing cream band — no theme flip). */
  variant?: "default" | "cream";
};

export function SectionHeading({ id, title, icon: Icon, className, variant = "default" }: SectionHeadingProps) {
  const cream = variant === "cream";

  return (
    <div className={cn("mb-10 flex flex-wrap items-center gap-4", className)}>
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            "size-7 shrink-0",
            cream ? "text-[#B8860B]" : "text-[#B8860B] dark:text-[#D4AF37]",
          )}
          aria-hidden
          strokeWidth={1.75}
        />
        <h2
          id={id}
          className={cn(
            "font-display text-3xl font-semibold tracking-tight md:text-4xl",
            cream ? "text-[#2a2218]" : "text-[#4B2E1E] dark:text-[#E8DDD4]",
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={cn(
          "h-px min-w-[4rem] flex-1 bg-gradient-to-r to-transparent",
          cream ? "from-[#c9a227]/55" : "from-[#D4AF37]/50 dark:from-[#D4AF37]/40",
        )}
        aria-hidden
      />
    </div>
  );
}
