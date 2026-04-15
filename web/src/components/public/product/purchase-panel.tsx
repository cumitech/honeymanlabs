"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCfa } from "@/lib/currency";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatKgFromGrams, formatLiters, toNumber } from "@/lib/product-math";
import {
  APPAREL_SIZES,
  PRODUCT_TYPE_LABELS,
  type ApparelSize,
  type Product,
  parseProductType,
  showsApparelSizeField,
  showsLitersField,
  showsWeightField,
} from "@/models/product";
import { cn } from "@/lib/utils";

export type PurchasePanelProps = {
  product: Product;
  className?: string;
};

export function PurchasePanel({ product, className }: PurchasePanelProps) {
  const productType = parseProductType(product.product_type);

  const stock = Math.max(0, Math.floor(Number(product.stock_quantity) || 0));
  const unitGrams = toNumber(product.weight_grams);
  const unitLiters = toNumber(product.liters);

  const [quantity, setQuantity] = useState(1);
  const [apparelSize, setApparelSize] = useState<ApparelSize>(() => {
    if (product.apparel_size && APPAREL_SIZES.includes(product.apparel_size as ApparelSize)) {
      return product.apparel_size as ApparelSize;
    }
    return "M";
  });

  const maxQty = stock;

  useEffect(() => {
    if (maxQty <= 0) return;
    setQuantity((q) => Math.min(Math.max(1, q), maxQty));
  }, [maxQty]);

  const clampedQuantity = Math.min(Math.max(1, quantity), Math.max(1, maxQty || 1));

  const showWeight = showsWeightField(productType);
  const showLiters = showsLitersField(productType) && unitLiters != null && unitLiters > 0;
  const showApparel = showsApparelSizeField(productType);

  const totalLiters = useMemo(() => {
    if (!showLiters || unitLiters == null) return null;
    return clampedQuantity * unitLiters;
  }, [showLiters, unitLiters, clampedQuantity]);

  const totalGrams = useMemo(() => {
    if (!showWeight || unitGrams == null) return null;
    return clampedQuantity * unitGrams;
  }, [showWeight, unitGrams, clampedQuantity]);

  const lineTotal = useMemo(
    () => (Number(product.price) || 0) * clampedQuantity,
    [product.price, clampedQuantity],
  );

  function adjustQuantityBy(delta: number) {
    if (maxQty <= 0) return;
    setQuantity((q) => {
      const next = q + delta;
      return Math.min(Math.max(1, next), maxQty);
    });
  }

  if (maxQty <= 0) {
    return (
      <div className={cn("rounded-2xl border border-border bg-card/80 p-6", className)}>
        <p className="text-sm font-medium text-muted-foreground">
          Currently out of stock — check back soon or contact us for restock dates.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8 rounded-2xl border border-border bg-card/80 p-6 shadow-sm", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {PRODUCT_TYPE_LABELS[productType]}
        </p>
      </div>

      {showApparel ? (
        <div className="space-y-3">
          <Label className="text-base font-semibold text-foreground">Size</Label>
          <RadioGroup
            value={apparelSize}
            onValueChange={(v) => setApparelSize(v as ApparelSize)}
            className="flex flex-wrap gap-2"
          >
            {APPAREL_SIZES.map((size) => (
              <label
                key={size}
                htmlFor={`size-${size}`}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                  apparelSize === size
                    ? "border-primary bg-primary/12 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40",
                )}
              >
                <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                <span>{size}</span>
              </label>
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Stock shown is for this product listing; availability may vary by size at fulfillment.
          </p>
        </div>
      ) : null}

      {!showApparel && (showLiters || (showWeight && unitGrams != null)) ? (
        <div className="space-y-2 rounded-xl bg-muted/40 px-4 py-3 text-sm">
          <p className="font-semibold text-foreground">Per unit in this listing</p>
          <ul className="space-y-1 text-muted-foreground">
            {showLiters ? (
              <li>
                Volume: <span className="font-medium text-foreground">{formatLiters(unitLiters!)}</span>
              </li>
            ) : null}
            {showWeight && unitGrams != null ? (
              <li>
                Net weight:{" "}
                <span className="font-medium text-foreground">{formatKgFromGrams(unitGrams)}</span>{" "}
                <span className="text-xs">({unitGrams} g)</span>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <div className="space-y-3">
        <Label htmlFor="product-qty" className="text-base font-semibold text-foreground">
          {showApparel ? "Quantity" : "How many units?"}
        </Label>
        <p className="text-xs text-muted-foreground">
          You can order up to <strong className="text-foreground">{maxQty}</strong>{" "}
          {showApparel ? "item(s)" : "unit(s)"} — the maximum currently recorded in stock for this
          product.
        </p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-full"
            onClick={() => adjustQuantityBy(-1)}
            disabled={clampedQuantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" aria-hidden />
          </Button>
          <input
            id="product-qty"
            readOnly
            value={clampedQuantity}
            className="w-16 rounded-lg border border-border bg-background py-2 text-center text-lg font-semibold tabular-nums"
            aria-live="polite"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0 rounded-full"
            onClick={() => adjustQuantityBy(1)}
            disabled={clampedQuantity >= maxQty}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>

      {(totalLiters != null || totalGrams != null) && !showApparel ? (
        <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm">
          <p className="font-semibold text-foreground">Your selection totals</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {totalLiters != null ? (
              <li>
                Total volume:{" "}
                <span className="font-medium text-foreground">{formatLiters(totalLiters)}</span>
              </li>
            ) : null}
            {totalGrams != null ? (
              <li>
                Total net weight:{" "}
                <span className="font-medium text-foreground">{formatKgFromGrams(totalGrams)}</span>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-muted-foreground">Line total</span>
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {formatCfa(lineTotal)}
          </span>
        </div>
        <Button
          type="button"
          variant="honey"
          className="h-12 w-full rounded-full text-base font-semibold shadow-md"
          onClick={() => {}}
        >
          Add to basket
        </Button>
      </div>
    </div>
  );
}
