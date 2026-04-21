import type { ContentLanguage } from "@/models/content-language";

/** Row from `GET /product_categories` (catalog / store grouping). */
export type ProductCategoryRow = {
  id: string;
  lang?: ContentLanguage;
  code: string;
  name: string;
  description?: string | null;
  sort_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function sortCategoriesForDisplay<T extends { sort_order?: number; name: string }>(
  rows: T[],
): T[] {
  return [...rows].sort((a, b) => {
    const ao = Number(a.sort_order ?? 9999);
    const bo = Number(b.sort_order ?? 9999);
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
}

export function activeCatalogCategories(categories: ProductCategoryRow[]): ProductCategoryRow[] {
  return categories.filter((c) => c.is_active !== false);
}
