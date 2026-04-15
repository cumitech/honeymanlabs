"use client";

import type { Control, FieldValues, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPAREL_SIZES,
  DEFAULT_PRODUCT_TYPE,
  PRODUCT_TYPE_LABELS,
  PRODUCT_TYPES,
  type ProductType,
  showsApparelSizeField,
  showsLitersField,
  showsWeightField,
} from "@/models/product";

type ProductTypeFieldsProps = {
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
};

export function ProductTypeFields({ control, setValue, disabled }: ProductTypeFieldsProps) {
  const productType = (useWatch({ control, name: "product_type" }) ??
    DEFAULT_PRODUCT_TYPE) as ProductType;

  const showWeight = showsWeightField(productType);
  const showLiters = showsLitersField(productType);
  const showApparel = showsApparelSizeField(productType);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="product_type"
        rules={{ required: "Product type is required" }}
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Product type</FormLabel>
            <Select
              disabled={disabled}
              value={field.value || DEFAULT_PRODUCT_TYPE}
              onValueChange={(v) => {
                field.onChange(v);
                const next = v as ProductType;
                if (next === "FARM_PRODUCTS") {
                  setValue("weight_grams", "");
                  setValue("liters", "");
                } else {
                  setValue("apparel_size", "");
                }
              }}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PRODUCT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {PRODUCT_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Controls which size fields apply — liquid honey uses volume + weight; apparel uses
              S–XXL only.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {showWeight && (
        <FormField
          control={control}
          name="weight_grams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Net weight{" "}
                <span className="font-normal text-muted-foreground">(grams)</span>
                {productType === "HONEY_PRODUCTS" || productType === "LAB_SUPPLIES" ? (
                  <span className="text-muted-foreground"> (recommended)</span>
                ) : null}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  min={0}
                  disabled={disabled}
                  value={field.value ?? ""}
                  placeholder="e.g. 500"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                {productType === "HONEY"
                  ? "Net weight of the jar or pack (label)."
                  : productType === "LAB_SUPPLIES"
                    ? "Package or unit weight (grams)."
                    : "Product weight for retail labeling."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showLiters && (
        <FormField
          control={control}
          name="liters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Volume{" "}
                <span className="font-normal text-muted-foreground">(liters)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.0001"
                  min={0}
                  disabled={disabled}
                  value={field.value ?? ""}
                  placeholder="e.g. 0.5"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                {productType === "HONEY"
                  ? "Liquid volume (e.g. 0.5 L, 1 L)."
                  : "Optional — use if the product is sold by volume as well as weight."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showApparel && (
        <FormField
          control={control}
          name="apparel_size"
          rules={{
            validate: (v, all) => {
              const t = all?.product_type as ProductType | undefined;
              if (t !== "FARM_PRODUCTS") return true;
              return Boolean(v && String(v).length > 0) || "Select a size for this product type";
            },
          }}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                Size <span className="text-destructive">*</span>
              </FormLabel>
              <Select
                disabled={disabled}
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {APPAREL_SIZES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Suits, gloves, veils, and similar gear — not used for jars or lab chemicals.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
