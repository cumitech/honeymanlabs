import type { ContentLanguage } from "@/models/content-language";

/** Row from `GET /product_sub_categories`. */
export type ProductSubCategoryRow = {
  id: string;
  lang?: ContentLanguage;
  category_id: string;
  code: string;
  name: string;
  description?: string | null;
  sort_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function sortSubCategoriesForDisplay<T extends { sort_order?: number; name: string }>(
  rows: T[],
): T[] {
  return [...rows].sort((a, b) => {
    const ao = Number(a.sort_order ?? 9999);
    const bo = Number(b.sort_order ?? 9999);
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
}

export function activeCatalogSubCategories(rows: ProductSubCategoryRow[]): ProductSubCategoryRow[] {
  return rows.filter((s) => s.is_active !== false);
}

export function subCategoriesForParent(
  all: ProductSubCategoryRow[],
  parentCategoryId: string,
): ProductSubCategoryRow[] {
  return all.filter((s) => s.category_id === parentCategoryId);
}
