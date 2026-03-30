import { Plus } from "lucide-react";
import Image from "next/image";

import type { FeaturedProduct } from "@/content/home";

type FeaturedProductCardProps = {
  product: FeaturedProduct;
};

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <article className="group rounded-3xl bg-white p-6">
      <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl bg-[#F5F0E8]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#312E27] [font-family:var(--font-display)]">
        {product.name}
      </h3>
      <p className="mb-4 text-sm text-[#5F5B52]">{product.meta}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-[#815100]">{product.price}</span>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFA500] text-[#0B0B0A] transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </article>
  );
}
