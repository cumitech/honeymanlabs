import Link from "next/link";

import { ProductCard } from "@/components/public/product/product-card";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";
import type { Product } from "@/models/product";

type FeaturedSectionProps = {
  products: Product[];
};

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section
      aria-labelledby="featured-products-heading"
      className={cn(homeMarketingBand.bg, "py-24")}
    >
      <div className="container mx-auto max-w-7xl px-8">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="featured-products-heading"
            className="font-display text-4xl font-bold text-[#2a2218]"
          >
            Featured Selection
          </h2>
          <Link
            href="/shop"
            className="shrink-0 self-start font-bold text-[#9C3F00] underline decoration-[#c9a227]/70 decoration-2 underline-offset-[6px] transition-colors hover:text-[#815100] hover:decoration-[#815100]/80"
          >
            View Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
