import type { ContentLanguage } from "@/models/content-language";

export const PRODUCT_CATEGORIES = ["HONEY", "HONEY_DERIVED", "BEEKEEPING_SUPPLY", "OTHER"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export const DEFAULT_PRODUCT_CATEGORY: ProductCategory = "HONEY";

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  HONEY: "Honey",
  HONEY_DERIVED: "Honey Derived",
  BEEKEEPING_SUPPLY: "Beekeeping Supply",
  OTHER: "Other",
};

export const MEASUREMENT_TYPES = ["MASS", "VOLUME", "COUNT"] as const;
export type MeasurementType = (typeof MEASUREMENT_TYPES)[number];

export const MEASUREMENT_UNITS = ["GRAM", "KILOGRAM", "MILLILITER", "LITER", "UNIT"] as const;
export type MeasurementUnit = (typeof MEASUREMENT_UNITS)[number];

export const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type ApparelSize = (typeof APPAREL_SIZES)[number];

// Backward-compatible alias for existing component naming.
export type ProductType = ProductCategory;
export const PRODUCT_TYPES = PRODUCT_CATEGORIES;
export const DEFAULT_PRODUCT_TYPE = DEFAULT_PRODUCT_CATEGORY;
export const PRODUCT_TYPE_LABELS = PRODUCT_CATEGORY_LABELS;

export function parseProductCategory(value: string | null | undefined): ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : DEFAULT_PRODUCT_CATEGORY;
}

export const parseProductType = parseProductCategory;

export function showsLitersField(type: ProductCategory): boolean {
  return type === "HONEY" || type === "HONEY_DERIVED" || type === "OTHER";
}

export function showsWeightField(type: ProductCategory): boolean {
  return type === "HONEY" || type === "HONEY_DERIVED";
}

export function showsApparelSizeField(type: ProductCategory): boolean {
  return type === "BEEKEEPING_SUPPLY";
}

export type Product = {
  id: string;
  lang: ContentLanguage;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  sub_category_id: string | null;
  category_code?: ProductCategory;
  stock_quantity: number;
  origin_region: string;
  featured_image: string;
  measurement_type: MeasurementType;
  measurement_unit: MeasurementUnit;
  measurement_value: number;
  net_grams: number | null;
  net_milliliters: number | null;
  attributes: Record<string, unknown> | null;
  apparel_size: ApparelSize | null;
  createdAt?: string;
  updatedAt?: string;
};

export const emptyProduct: Product = {
  id: "",
  lang: "en",
  name: "",
  slug: "",
  description: "",
  price: 0,
  category_id: "",
  sub_category_id: null,
  category_code: DEFAULT_PRODUCT_CATEGORY,
  stock_quantity: 0,
  origin_region: "",
  featured_image: "",
  measurement_type: "MASS",
  measurement_unit: "GRAM",
  measurement_value: 0,
  net_grams: null,
  net_milliliters: null,
  attributes: null,
  apparel_size: null,
};

export type ProductFormValues = {
  category_code: ProductCategory;
  measurement_type: MeasurementType;
  measurement_unit: MeasurementUnit;
  measurement_value: string;
  net_grams: string;
  net_milliliters: string;
  apparel_size: ApparelSize | "";
  sub_category_id: string;
};

export const emptyProductForm: ProductFormValues = {
  category_code: DEFAULT_PRODUCT_CATEGORY,
  measurement_type: "MASS",
  measurement_unit: "GRAM",
  measurement_value: "",
  net_grams: "",
  net_milliliters: "",
  apparel_size: "",
  sub_category_id: "",
};

