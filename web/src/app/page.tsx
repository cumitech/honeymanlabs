import { GallerySection } from "@/components/public/home/gallery-section";
import { LandingHero } from "@/components/public/home/landing-hero";
import { MeetUsSection } from "@/components/public/home/meet-us-section";
import { ReviewsSection } from "@/components/public/home/reviews-section";
import type { PublicArticleCardData } from "@/components/public/article/article-card";
import { FeaturedSection } from "@/components/public/marketing/featured-section";
import { MissionSection } from "@/components/public/marketing/mission-section";
import { PartnerCta } from "@/components/public/marketing/partner-cta";
import { ResourcesSection } from "@/components/public/marketing/resources-section";
import type { Article } from "@/models/article";
import type { Product } from "@/models/product";

const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${APP_API_URL}/products`, {
      next: { revalidate: 120 },
      headers: { "X-Language": "en" },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as Product[];
    return data.slice(0, 3);
  } catch {
    return [];
  }
}

async function fetchLatestArticles(): Promise<PublicArticleCardData[]> {
  try {
    const response = await fetch(`${APP_API_URL}/articles`, {
      next: { revalidate: 120 },
      headers: { "X-Language": "en" },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as Article[];
    return data.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      tag: "Latest",
      excerpt: item.excerpt ?? "Read the latest update from Honeyman.",
      imageSrc: "/images/honeycombs-3.png",
      href: "/education",
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, resourceArticles] = await Promise.all([
    fetchFeaturedProducts(),
    fetchLatestArticles(),
  ]);

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-4 top-16 h-24 w-24 opacity-[0.14] md:h-36 md:w-36"
        style={{
          backgroundImage: "url('/images/honeycombs-2.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-[44%] h-20 w-20 opacity-[0.11] md:h-28 md:w-28"
        style={{
          backgroundImage: "url('/images/honeycombs-3.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10">
        <LandingHero />

        <MissionSection />

        <GallerySection />

        <FeaturedSection products={featuredProducts} />

        <ReviewsSection />

        <MeetUsSection />

        <ResourcesSection
          id="resources"
          title={
            <>
              Latest <span className="italic">Resources</span>
            </>
          }
          subtitle="Stay updated with beekeeping trends and laboratory breakthroughs."
          articles={resourceArticles}
          columns={3}
        />

        <PartnerCta />
      </div>
    </main>
  );
}
