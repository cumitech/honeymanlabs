import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCfa } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { Product } from "@/models/product";

type ProductCardProps = {
  product: Product;
  badge?: string;
  className?: string;
};

export function ProductCard({ product, badge, className }: ProductCardProps) {
  const detailPath = product.slug ? `/products/${product.slug}` : "/contact";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/40">
        {product.featured_image ? (
          <Image
            src={product.featured_image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/10 to-muted">
            <ShoppingCart className="h-10 w-10 text-primary/70" />
          </div>
        )}
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl italic text-foreground">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description || "Premium quality product with traceable source and quality controls."}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">{formatCfa(product.price)}</span>
          <Button asChild size="icon" className="h-10 w-10">
            <Link href={detailPath} aria-label={`View ${product.name}`}>
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

