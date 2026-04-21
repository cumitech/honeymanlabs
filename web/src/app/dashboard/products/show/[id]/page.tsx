"use client";

import { useShow } from "@refinedev/core";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCT_TYPE_LABELS, parseProductCategory, type Product } from "@/models/product";

export default function ProductShowPage() {
  const { result: product } = useShow<Product>({ resource: "products" });
  const productType =
    product?.category_code != null ? parseProductCategory(String(product.category_code)) : undefined;
  const typeLabel =
    productType != null && productType in PRODUCT_TYPE_LABELS
      ? PRODUCT_TYPE_LABELS[productType]
      : (product?.category_code ?? "—");

  return (
    <ShowView>
      <ShowViewHeader resource="products" title="Product details" />
      <Card>
        <CardHeader><CardTitle>{product?.name ?? "Product"}</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {product?.id ?? "-"}</p>
          <p><strong>Language:</strong> {product?.lang ?? "-"}</p>
          <p><strong>Category:</strong> {typeLabel}</p>
          <p><strong>Name:</strong> {product?.name ?? "-"}</p>
          <p><strong>Slug:</strong> {product?.slug ?? "-"}</p>
          <p><strong>Description:</strong> {product?.description ?? "-"}</p>
          <p><strong>Price:</strong> {String(product?.price ?? "-")}</p>
          <p><strong>Category ID:</strong> {product?.category_id ?? "-"}</p>
          <p><strong>Sub category ID:</strong> {product?.sub_category_id ?? "—"}</p>
          <p><strong>Stock quantity:</strong> {String(product?.stock_quantity ?? "-")}</p>
          <p><strong>Measurement type:</strong> {product?.measurement_type ?? "—"}</p>
          <p><strong>Measurement unit:</strong> {product?.measurement_unit ?? "—"}</p>
          <p><strong>Measurement value:</strong> {product?.measurement_value != null ? String(product.measurement_value) : "—"}</p>
          <p><strong>Net grams:</strong> {product?.net_grams != null ? String(product.net_grams) : "—"}</p>
          <p><strong>Net milliliters:</strong> {product?.net_milliliters != null ? String(product.net_milliliters) : "—"}</p>
          <p><strong>Apparel size:</strong> {product?.apparel_size ?? "—"}</p>
          <p><strong>Origin region:</strong> {product?.origin_region ?? "-"}</p>
          <p><strong>Featured image:</strong> {product?.featured_image ?? "-"}</p>
        </CardContent>
      </Card>
    </ShowView>
  );
}
