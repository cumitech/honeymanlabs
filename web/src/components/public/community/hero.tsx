import { PageHero } from "@/components/public/layout/page-hero";
import { publicImages } from "@/config/public-media";

export function CommunityHero() {
  return (
    <PageHero
      eyebrow="Beekeeper network"
      headingId="community-hero-heading"
      title="Honey work, done with receipts"
      description="We coordinate training days, connect you to buyers who ask for lab sheets, and keep communication in one thread—French or English, your call."
      imageSrc={publicImages.beekeeperField.src}
      imageAlt={publicImages.beekeeperField.alt}
      imagePriority
      cta={{ href: "#join", label: "Apply to partner" }}
      ctaSecondary={{ href: "/contact", label: "Talk to us" }}
    />
  );
}
