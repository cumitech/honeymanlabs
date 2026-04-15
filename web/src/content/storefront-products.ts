import type { Product } from "@/models/product";

/** Demo storefront rows until a public catalog API exists. */
export const STOREFRONT_PRODUCTS: Product[] = [
  {
    id: "prod_wild_highland",
    lang: "en",
    slug: "wild-highland-honey",
    name: "Wild Highland Honey",
    description:
      "Single-origin raw honey from the Adamaoua highlands. Floral, balanced, and lab-checked for purity before it reaches your table.",
    price: 24,
    category: "cat_honey",
    stock_quantity: 40,
    origin_region: "Adamaoua Region",
    featured_image: "/images/premium_photo-1664273586606-d7c9804729c2.jpg",
    product_type: "HONEY",
    weight_grams: 500,
    liters: 0.5,
    apparel_size: null,
  },
  {
    id: "prod_forest_white",
    lang: "en",
    slug: "forest-white-honey",
    name: "Forest White Honey",
    description:
      "Delicate Oku highland white honey with a creamy melt. Each jar reflects the forest canopy and careful cold extraction.",
    price: 18,
    category: "cat_honey",
    stock_quantity: 30,
    origin_region: "Oku Highlands",
    featured_image: "/images/photo-1590334280707-9d5e0f60a539.jpg",
    product_type: "HONEY",
    weight_grams: 250,
    liters: 0.25,
    apparel_size: null,
  },
  {
    id: "prod_beeswax_candles",
    lang: "en",
    slug: "raw-beeswax-candles",
    name: "Raw Beeswax Candles",
    description:
      "Hand-poured pair of candles using filtered beeswax from partner apiaries. Warm light, subtle honeyed aroma.",
    price: 32,
    category: "cat_other",
    stock_quantity: 25,
    origin_region: "Southwest",
    featured_image: "/images/HoneyFrame_Scrapping-600x600.png",
    product_type: "HONEY_PRODUCTS",
    weight_grams: 200,
    liters: null,
    apparel_size: null,
  },
  {
    id: "prod_ventilated_suit",
    lang: "en",
    slug: "ventilated-bee-suit",
    name: "Ventilated Beekeeping Suit",
    description:
      "Triple-layer mesh suit for hot-climate work. Reinforced zips, detachable veil, and pockets sized for hive tools.",
    price: 189,
    category: "cat_farm",
    stock_quantity: 12,
    origin_region: "Partner workshop",
    featured_image: "/images/photo-1549269459-ba9e31874ef2.jpg",
    product_type: "FARM_PRODUCTS",
    weight_grams: null,
    liters: null,
    apparel_size: "L",
  },
  {
    id: "prod_ph_kit",
    lang: "en",
    slug: "honey-ph-test-kit",
    name: "Honey pH Screening Kit",
    description:
      "Field kit with calibrated strips and vials for quick acidity checks—ideal for batch documentation alongside lab sends.",
    price: 45,
    category: "cat_lab",
    stock_quantity: 60,
    origin_region: "Lab partners",
    featured_image: "/images/Untitled-design-5-600x600.png",
    product_type: "LAB_SUPPLIES",
    weight_grams: 120,
    liters: null,
    apparel_size: null,
  },
];

export function getStorefrontProductBySlug(slug: string): Product | undefined {
  return STOREFRONT_PRODUCTS.find((product) => product.slug === slug);
}
