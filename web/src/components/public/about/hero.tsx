import { PageHero } from "@/components/public/layout/page-hero";
import { publicImages } from "@/config/public-media";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="Legacy & innovation"
      headingId="about-hero-heading"
      className="border-b-0 pb-2 md:pb-3"
      title={
        <>
          The <span className="text-[#9A6B2D] dark:text-amber-400/90">Golden</span> alchemy.
        </>
      }
      description="We started in Ngaoundéré with jars sold at the market and lab sheets stapled behind the table. Today we still answer the phone ourselves—and we still file batch numbers the same way."
      imageSrc={publicImages.honeyJarCutout.src}
      imageAlt={publicImages.honeyJarCutout.alt}
      imagePriority
      imageObjectFit="contain"
      cta={{ href: "/contact", label: "Partner with us" }}
      ctaSecondary={{ href: "/products", label: "Shop honey" }}
    />
  );
}
