/** Home page — featured products & resource articles (single source of truth). */

export type FeaturedProduct = {
  id: string;
  /** Public product detail URL: `/products/[slug]` */
  slug: string;
  name: string;
  meta: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

export type ResourceArticle = {
  id: string;
  title: string;
  tag: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "wild-highland-honey",
    slug: "wild-highland-honey",
    name: "Wild Highland Honey",
    meta: "Adamaoua Region | 500g",
    price: "$24.00",
    imageSrc: "/images/premium_photo-1664273586606-d7c9804729c2.jpg",
    imageAlt: "Wild Highland Honey",
  },
  {
    id: "forest-white-honey",
    slug: "forest-white-honey",
    name: "Forest White Honey",
    meta: "Oku Highlands | 250g",
    price: "$18.00",
    imageSrc: "/images/photo-1590334280707-9d5e0f60a539.jpg",
    imageAlt: "Forest White Honey",
  },
  {
    id: "raw-beeswax-candles",
    slug: "raw-beeswax-candles",
    name: "Raw Beeswax Candles",
    meta: "Handcrafted | Set of 2",
    price: "$32.00",
    imageSrc: "/images/HoneyFrame_Scrapping-600x600.png",
    imageAlt: "Raw Beeswax Candles",
  },
];

export const resourceArticles: ResourceArticle[] = [
  {
    id: "purity-markers-forest-blossom",
    tag: "Laboratory Update",
    title: "New Purity Markers in Forest Blossom Honey",
    excerpt:
      "Recent findings from our Buea lab reveal three unique antioxidant markers previously uncatalogued in African honey varieties.",
    imageSrc: "/images/photo-1549269459-ba9e31874ef2.jpg",
    imageAlt: "Close up of honeycomb with flowing honey",
    href: "/blog-posts",
  },
  {
    id: "women-bamenda-highlands",
    tag: "Community Story",
    title: "The Women of the Bamenda Highlands",
    excerpt:
      "How a small collective of female beekeepers is revolutionizing sustainable harvest practices across the region.",
    imageSrc: "/images/local-honey-9061428_1280.png",
    imageAlt: "Scientific testing of honey in a glass vial",
    href: "/blog-posts",
  },
  {
    id: "crystallization-quality-mark",
    tag: "Education",
    title: "Crystallization: Nature's Quality Mark",
    excerpt:
      'Debunking the myth that crystallized honey is "bad" or "old." Discover the science of sugar ratios.',
    imageSrc: "/images/Untitled-design-5-600x600.png",
    imageAlt: "Wooden honey dipper on a rustic surface",
    href: "/blog-posts",
  },
];
