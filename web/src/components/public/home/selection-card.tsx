import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { FeaturedProduct } from "@/content/home";
import { cn } from "@/lib/utils";

export function SelectionCard({ product }: { product: FeaturedProduct }) {
  return (
    <article
      className={cn(
        "bg-white dark:bg-[rgba(253,246,234,0.06)] rounded-3xl p-6 group",
        "border border-[#815100]/[0.06] dark:border-[var(--foreground)]/10",
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-2xl"
      >
        <div className="aspect-square bg-[#F5F0E8] dark:bg-[rgba(255,170,0,0.08)] rounded-2xl mb-6 overflow-hidden relative">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-display font-bold text-[var(--foreground)] mb-2">
          {product.name}
        </h3>
      </Link>
      <p className="text-[#5F5B52] dark:text-[var(--muted-foreground)] text-sm mb-4">{product.meta}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-[#815100] dark:text-[var(--primary)]">{product.price}</span>
        <Link
          href={`/products/${product.slug}`}
          className={cn(
            "w-10 h-10 shrink-0 bg-[#FFA500] text-black rounded-full flex items-center justify-center",
            "transition-[transform,box-shadow] hover:brightness-110 hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
          )}
          aria-label={`Shop ${product.name}`}
        >
          <Plus className="size-5 stroke-[2.5]" strokeWidth={2.5} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
