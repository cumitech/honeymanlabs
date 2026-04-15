/**
 * Storefront product classification — drives which size fields apply (honey volume/weight vs apparel).
 */
export const PRODUCT_TYPES = [
  "HONEY",
  "HONEY_PRODUCTS",
  "FARM_PRODUCTS",
  "LAB_SUPPLIES",
  "OTHER",
] as const;

export type ProductTypeValue = (typeof PRODUCT_TYPES)[number];

export const DEFAULT_PRODUCT_TYPE: ProductTypeValue = "HONEY";

export function isProductType(value: unknown): value is ProductTypeValue {
  return typeof value === "string" && (PRODUCT_TYPES as readonly string[]).includes(value);
}

/** Garment / gear sizing for suits, gloves, veils, etc. */
export const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export type ApparelSizeValue = (typeof APPAREL_SIZES)[number];

export function isApparelSize(value: unknown): value is ApparelSizeValue {
  return typeof value === "string" && (APPAREL_SIZES as readonly string[]).includes(value);
}
