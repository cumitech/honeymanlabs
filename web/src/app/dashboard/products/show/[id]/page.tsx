"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCT_TYPE_LABELS, parseProductType, type Product } from "@/models/product";

export default function ProductShowPage() {
  const { result: product } = useShow<Product>({ resource: "products" });
  const productType =
    product?.product_type != null ? parseProductType(String(product.product_type)) : undefined;
  const typeLabel =
    productType != null && productType in PRODUCT_TYPE_LABELS
      ? PRODUCT_TYPE_LABELS[productType]
      : (product?.product_type ?? "—");

  return (
    <ShowView>
      <ShowViewHeader resource="products" title="Product details" />
      <Card>
        <CardHeader><CardTitle>{product?.name ?? "Product"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {product?.id ?? "-"}</p>
          <p><strong>Language:</strong> {product?.lang ?? "-"}</p>
          <p><strong>Product type:</strong> {typeLabel}</p>
          <p><strong>Name:</strong> {product?.name ?? "-"}</p>
          <p><strong>Slug:</strong> {product?.slug ?? "-"}</p>
          <p><strong>Description:</strong> {product?.description ?? "-"}</p>
          <p><strong>Price:</strong> {String(product?.price ?? "-")}</p>
          <p><strong>Category ID:</strong> {product?.category ?? "-"}</p>
          <p><strong>Stock quantity:</strong> {String(product?.stock_quantity ?? "-")}</p>
          <p><strong>Net weight (g):</strong> {product?.weight_grams != null ? String(product.weight_grams) : "—"}</p>
          <p><strong>Volume (L):</strong> {product?.liters != null ? String(product.liters) : "—"}</p>
          <p><strong>Apparel size:</strong> {product?.apparel_size ?? "—"}</p>
          <p><strong>Origin region:</strong> {product?.origin_region ?? "-"}</p>
          <p><strong>Featured image:</strong> {product?.featured_image ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
