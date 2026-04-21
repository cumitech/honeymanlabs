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
  type MeasurementType,
  type ProductType,
} from "@/models/product";

type ProductTypeFieldsProps = {
  control: Control<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  disabled?: boolean;
};

export function ProductTypeFields({ control, setValue, disabled }: ProductTypeFieldsProps) {
  const productType = (useWatch({ control, name: "category_code" }) ??
    DEFAULT_PRODUCT_TYPE) as ProductType;
  const measurementType = (useWatch({ control, name: "measurement_type" }) ?? "MASS") as MeasurementType;
  const showWeight = measurementType === "MASS";
  const showLiters = measurementType === "VOLUME";
  const showApparel = productType === "BEEKEEPING_SUPPLY";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="category_code"
        rules={{ required: "Product type is required" }}
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Category code</FormLabel>
            <Select
              disabled={disabled}
              value={field.value || DEFAULT_PRODUCT_TYPE}
              onValueChange={(v) => {
                field.onChange(v);
                if (v !== "BEEKEEPING_SUPPLY") setValue("apparel_size", "");
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
              Aligns to backend taxonomy category enum.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="measurement_type"
        rules={{ required: "Measurement type is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Measurement type</FormLabel>
            <Select
              disabled={disabled}
              value={field.value || "MASS"}
              onValueChange={(v) => {
                field.onChange(v);
                if (v !== "MASS") setValue("net_grams", "");
                if (v !== "VOLUME") setValue("net_milliliters", "");
              }}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select measurement type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="MASS">Mass</SelectItem>
                <SelectItem value="VOLUME">Volume</SelectItem>
                <SelectItem value="COUNT">Count</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="measurement_unit"
        rules={{ required: "Measurement unit is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Measurement unit</FormLabel>
            <Select disabled={disabled} value={field.value || "GRAM"} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select measurement unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="GRAM">GRAM</SelectItem>
                <SelectItem value="KILOGRAM">KILOGRAM</SelectItem>
                <SelectItem value="MILLILITER">MILLILITER</SelectItem>
                <SelectItem value="LITER">LITER</SelectItem>
                <SelectItem value="UNIT">UNIT</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="measurement_value"
        rules={{ required: "Measurement value is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Measurement value</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
                min={0}
                disabled={disabled}
                value={field.value ?? ""}
                placeholder="e.g. 500 or 1"
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showWeight && (
        <FormField
          control={control}
          name="net_grams"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Net weight{" "}
                <span className="font-normal text-muted-foreground">(grams)</span>
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
                Optional normalized weight used for display and comparison.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showLiters && (
        <FormField
          control={control}
          name="net_milliliters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Net volume{" "}
                <span className="font-normal text-muted-foreground">(milliliters)</span>
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
              <FormDescription>Optional normalized volume used for display and comparison.</FormDescription>
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
              const t = all?.category_code as ProductType | undefined;
              if (t !== "BEEKEEPING_SUPPLY") return true;
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
