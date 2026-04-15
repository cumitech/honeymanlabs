import Image from "next/image";
import Link from "next/link";

import type { FeaturedProduct } from "@/content/home";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: FeaturedProduct;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "flex w-[min(100%,260px)] flex-col rounded-[1.75rem] border border-[var(--foreground)]/[0.07]",
        "bg-[var(--surface)]/[0.97] shadow-[0_28px_70px_-28px_rgba(27,18,0,0.28)]",
        "p-6 pt-7 transition-[transform,box-shadow] duration-300 hover:shadow-[0_32px_80px_-32px_rgba(27,18,0,0.35)]",
        "backdrop-blur-sm",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto size-[4.25rem] shrink-0 overflow-hidden rounded-full",
          "ring-2 ring-[var(--primary)]/35 ring-offset-[3px] ring-offset-[var(--surface)]",
        )}
      >
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="68px"
          className="object-cover"
        />
      </div>
      <h3
        className={cn(
          "mt-4 text-center font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-[var(--foreground)] md:text-lg",
        )}
      >
        {product.name}
      </h3>
      <p className="mt-3 text-center text-xs leading-relaxed text-[var(--muted-foreground)]">
        <span className="font-medium text-[var(--foreground)]/75">{product.price}</span>
        <span className="mx-1.5 inline-block text-[var(--foreground)]/25" aria-hidden>
          ·
        </span>
        <span>{product.meta}</span>
      </p>
    </Link>
  );
}
