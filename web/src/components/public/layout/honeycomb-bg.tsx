import { cn } from "@/lib/utils";

/** Subtle repeating hex grid for footer / dark sections. */
const hexLight =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath d='M14 0 26 7v14L14 28 2 21V7z' fill='none' stroke='%23815100' stroke-width='0.45'/%3E%3C/svg%3E\")";
const hexDark =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath d='M14 0 26 7v14L14 28 2 21V7z' fill='none' stroke='%23D4AF37' stroke-width='0.4'/%3E%3C/svg%3E\")";

export function HoneycombBg({ className }: { className?: string }) {
  const tile = { backgroundSize: "28px 49px" as const };
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.14] dark:hidden"
        style={{ ...tile, backgroundImage: hexLight }}
      />
      <div
        className="absolute inset-0 hidden opacity-[0.18] dark:block"
        style={{ ...tile, backgroundImage: hexDark }}
      />
    </div>
  );
}

