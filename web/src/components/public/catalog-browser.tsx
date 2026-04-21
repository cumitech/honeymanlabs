"use client";

import { useEffect, useMemo, useState } from "react";
import { ListFilter, Search } from "lucide-react";

import { ProductCard } from "@/components/public/product/product-card";
import { Button } from "@/components/ui/button";
import {
  appControlFilledSearch,
  appControlFilledSelect,
  marketingFilterPanel,
} from "@/lib/app-ui";
import { cn } from "@/lib/utils";
import type { Product, ProductType } from "@/models/product";
import {
  activeCatalogCategories,
  sortCategoriesForDisplay,
  type ProductCategoryRow,
} from "@/models/product-category";
import {
  activeCatalogSubCategories,
  sortSubCategoriesForDisplay,
  subCategoriesForParent,
  type ProductSubCategoryRow,
} from "@/models/product-sub-category";

type CatalogBrowserProps = {
  products: Product[];
  categories: ProductCategoryRow[];
  subCategories: ProductSubCategoryRow[];
};

const TYPE_OPTIONS: Array<{ value: ProductType | "ALL"; label: string }> = [
  { value: "ALL", label: "All types" },
  { value: "HONEY", label: "Honey" },
  { value: "HONEY_DERIVED", label: "Honey derived" },
  { value: "BEEKEEPING_SUPPLY", label: "Farm & beekeeping tools" },
  { value: "OTHER", label: "Other" },
];

const PRICE_OPTIONS = [
  { value: "ALL", label: "All prices" },
  { value: "LOW", label: "Under $50" },
  { value: "MID", label: "$50 - $150" },
  { value: "HIGH", label: "Above $150" },
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "name_asc", label: "Name: A-Z" },
] as const;

const ALL = "ALL";

export function CatalogBrowser({
  products,
  categories,
  subCategories,
}: CatalogBrowserProps) {
  const [query, setQuery] = useState("");
  const [type, setType] =
    useState<(typeof TYPE_OPTIONS)[number]["value"]>("ALL");
  const [categoryId, setCategoryId] = useState<string>(ALL);
  const [subCategoryId, setSubCategoryId] = useState<string>(ALL);
  const [region, setRegion] = useState("ALL");
  const [priceBand, setPriceBand] =
    useState<(typeof PRICE_OPTIONS)[number]["value"]>("ALL");
  const [sort, setSort] =
    useState<(typeof SORT_OPTIONS)[number]["value"]>("featured");

  const categoryRows = useMemo(
    () => sortCategoriesForDisplay(activeCatalogCategories(categories)),
    [categories],
  );

  const subCategoryOptions = useMemo(() => {
    const active = activeCatalogSubCategories(subCategories);
    if (categoryId === ALL) {
      return sortSubCategoriesForDisplay(active);
    }
    return sortSubCategoriesForDisplay(subCategoriesForParent(active, categoryId));
  }, [subCategories, categoryId]);

  useEffect(() => {
    if (subCategoryId === ALL) return;
    const stillValid = subCategoryOptions.some((s) => s.id === subCategoryId);
    if (!stillValid) setSubCategoryId(ALL);
  }, [subCategoryOptions, subCategoryId]);

  const regionOptions = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((item) => item.origin_region).filter(Boolean)),
    );
    return ["ALL", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const out = products.filter((item) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);
      const matchesType = type === "ALL" || item.category_code === type;
      const matchesCategory =
        categoryId === ALL || item.category_id === categoryId;
      const matchesSub =
        subCategoryId === ALL ||
        (item.sub_category_id != null && item.sub_category_id === subCategoryId);
      const matchesRegion = region === "ALL" || item.origin_region === region;
      const matchesPrice =
        priceBand === "ALL" ||
        (priceBand === "LOW" && item.price < 50) ||
        (priceBand === "MID" && item.price >= 50 && item.price <= 150) ||
        (priceBand === "HIGH" && item.price > 150);
      return (
        matchesQuery &&
        matchesType &&
        matchesCategory &&
        matchesSub &&
        matchesRegion &&
        matchesPrice
      );
    });

    const sorted = [...out];
    if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name_asc")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [
    products,
    query,
    type,
    categoryId,
    subCategoryId,
    region,
    priceBand,
    sort,
  ]);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className={marketingFilterPanel}>
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          <ListFilter className="h-4 w-4" />
          Filters
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className={appControlFilledSearch}
            />
          </label>
          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as (typeof TYPE_OPTIONS)[number]["value"],
              )
            }
            className={cn(appControlFilledSelect, "px-3")}
          >
            {TYPE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className={cn(appControlFilledSelect, "px-3")}
          >
            {regionOptions.map((value) => (
              <option key={value} value={value}>
                {value === "ALL" ? "All regions" : value}
              </option>
            ))}
          </select>
          <select
            value={priceBand}
            onChange={(event) =>
              setPriceBand(
                event.target.value as (typeof PRICE_OPTIONS)[number]["value"],
              )
            }
            className={cn(appControlFilledSelect, "px-3")}
          >
            {PRICE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value as (typeof SORT_OPTIONS)[number]["value"],
              )
            }
            className={cn(appControlFilledSelect, "px-3")}
          >
            {SORT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <select
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
            className={cn(appControlFilledSelect, "px-3")}
            aria-label="Product category"
          >
            <option value={ALL}>All categories</option>
            {categoryRows.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.code ? ` (${c.code})` : ""}
              </option>
            ))}
          </select>
          <select
            value={subCategoryId}
            onChange={(event) => setSubCategoryId(event.target.value)}
            className={cn(appControlFilledSelect, "px-3")}
            aria-label="Product sub-category"
            disabled={subCategoryOptions.length === 0}
          >
            <option value={ALL}>All sub-categories</option>
            {subCategoryOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {categoryId === ALL && s.code ? ` · ${s.code}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            product(s)
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("");
              setType("ALL");
              setCategoryId(ALL);
              setSubCategoryId(ALL);
              setRegion("ALL");
              setPriceBand("ALL");
              setSort("featured");
            }}
          >
            Reset filters
          </Button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            badge={index === 0 ? "Top pick" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
