import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/public/layout/page-hero";
import { PurchasePanel } from "@/components/public/product/purchase-panel";
import { formatCfa } from "@/lib/currency";
import type { Product } from "@/models/product";

type PageProps = { params: Promise<{ slug: string }> };
const APP_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${APP_API_URL}/products?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 120 },
      headers: { "X-Language": "en" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Product[];
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: `${product.name} · Honeyman`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const heroDescription =
    product.description.length > 280
      ? `${product.description.slice(0, 277).trimEnd()}…`
      : product.description;

  const heroImageRemote = /^https?:\/\//i.test(product.featured_image);

  return (
    <main className="w-full bg-[#FDF9F3] dark:bg-[#14100d]">
      <PageHero
        eyebrow={product.origin_region}
        headingId="product-hero-heading"
        title={product.name}
        description={heroDescription}
        imageSrc={product.featured_image}
        imageAlt={product.name}
        imagePriority
        imageUnoptimized={heroImageRemote}
        cta={{ href: "#product-order", label: "Order now" }}
        ctaSecondary={{ href: "/shop", label: "Back to shop" }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <nav className="mb-8 text-sm text-[#6B5344] dark:text-stone-400">
          <Link href="/shop" className="font-medium text-[#9A6B2D] hover:underline dark:text-amber-500">
            Shop
          </Link>
          <span className="mx-2 text-muted-foreground/60" aria-hidden>
            /
          </span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
          <div className="space-y-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-sm md:aspect-video">
              <Image
                src={product.featured_image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized={heroImageRemote}
              />
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>
              <p className="mt-6 text-sm text-muted-foreground">
                Unit price:{" "}
                <span className="font-semibold text-foreground">{formatCfa(product.price)}</span>
              </p>
            </div>
          </div>

          <div id="product-order" className="scroll-mt-28">
            <PurchasePanel product={product} className="lg:sticky lg:top-24" />
          </div>
        </div>
      </div>
    </main>
  );
}
