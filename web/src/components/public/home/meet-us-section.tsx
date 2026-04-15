import Image from "next/image";
import Link from "next/link";
import { Play, Users } from "lucide-react";

import { SectionHeading } from "@/components/public/home/section-heading";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { homeMeetUsMedia } from "@/config/home-section-media";
import { cn } from "@/lib/utils";

export function MeetUsSection() {
  return (
    <section
      id="meet-us"
      aria-labelledby="meet-us-heading"
      className={cn(homeMarketingBand.bg, "relative py-16 md:py-24")}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <SectionHeading id="meet-us-heading" title="Meet us" icon={Users} variant="cream" />

        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14 lg:gap-16">
          <div className="space-y-4 text-[#3d342a]">
            <p className="text-lg leading-relaxed md:text-xl">
              We are beekeepers, analysts, and educators working together — from hive checks to lab benches —
              so every jar and every batch can be traced with care.
            </p>
            <p className="leading-relaxed text-[#5c4a38]">
              Honeyman pairs field experience with transparent testing: moisture, pollen signatures, and
              authenticity markers you can share with buyers and regulators alike.
            </p>
            <Link
              href={homeMeetUsMedia.videoHref}
              className="inline-flex items-center gap-2 font-medium text-[#815100] underline-offset-4 hover:underline"
            >
              Read our full story
            </Link>
          </div>

          <Link
            href={homeMeetUsMedia.videoHref}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl shadow-[0_18px_50px_-28px_rgba(35,28,18,0.12)]"
          >
            <Image
              src={homeMeetUsMedia.posterSrc}
              alt={homeMeetUsMedia.posterAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/25 transition-colors",
                "group-hover:bg-black/35",
              )}
            >
              <span
                className={cn(
                  "flex size-16 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black/40",
                  "text-[#D4AF37] shadow-lg backdrop-blur-sm md:size-20",
                )}
              >
                <Play className="size-8 fill-current pl-1 md:size-10" aria-hidden />
              </span>
              <span className="sr-only">Open about page</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
