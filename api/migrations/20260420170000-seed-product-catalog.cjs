"use strict";

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() -
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function toInitials(tableName) {
  const cleaned = String(tableName).replace(/[^a-zA-Z0-9_]/g, "");
  const parts = cleaned.split("_").filter(Boolean);
  if (parts.length === 0) return "ID";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts.map((part) => part[0]).join("").toUpperCase();
}

function idPrefixForTable(tableName) {
  const now = new Date();
  const year = String(now.getFullYear() % 100).padStart(2, "0");
  const day = String(getDayOfYear(now)).padStart(3, "0");
  return `${toInitials(tableName)}-${year}${day}`;
}

async function createIdGenerator(queryInterface, tableName) {
  const prefix = idPrefixForTable(tableName);
  const [rows] = await queryInterface.sequelize.query(
    `
      SELECT id
      FROM ${tableName}
      WHERE id LIKE :prefixLike
      ORDER BY id DESC
      LIMIT 1
    `,
    { replacements: { prefixLike: `${prefix}-%` } },
  );

  const lastId = rows.length > 0 ? String(rows[0].id) : "";
  const suffixMatch = lastId.match(/-(\d{4})$/);
  let next = suffixMatch ? Number(suffixMatch[1]) + 1 : 1;

  return () => {
    const id = `${prefix}-${String(next).padStart(4, "0")}`;
    next += 1;
    return id;
  };
}

async function rowByCode(queryInterface, tableName, code) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT id, code FROM ${tableName} WHERE code = :code LIMIT 1`,
    { replacements: { code } },
  );
  return rows[0] ?? null;
}

async function rowBySlug(queryInterface, slug) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT id, slug FROM products WHERE slug = :slug LIMIT 1`,
    { replacements: { slug } },
  );
  return rows[0] ?? null;
}

const IMAGE_LIBRARY = {
  HONEY: [
    "https://images.unsplash.com/photo-1668510468038-3607aae3f03c?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1568657704598-602700bd9694?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1600&h=1000&q=80",
  ],
  HONEY_DERIVED: [
    "https://images.unsplash.com/photo-1646171638130-9eefc42feaab?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1568657704598-602700bd9694?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1668510468038-3607aae3f03c?auto=format&fit=crop&w=1600&h=1000&q=80",
  ],
  BEEKEEPING_SUPPLY: [
    "https://images.unsplash.com/photo-1758522964614-cebe9b656c9f?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1758522965366-a6ab0e8f2e63?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1600&h=1000&q=80",
  ],
  OTHER: [
    "https://images.unsplash.com/photo-1668510468038-3607aae3f03c?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1568657704598-602700bd9694?auto=format&fit=crop&w=1600&h=1000&q=80",
    "https://images.unsplash.com/photo-1646171638130-9eefc42feaab?auto=format&fit=crop&w=1600&h=1000&q=80",
  ],
};

function resolvedProductImages(product) {
  const bucket = IMAGE_LIBRARY[product.category] || IMAGE_LIBRARY.OTHER;
  return product.images.map((_, index) => bucket[index % bucket.length]);
}

module.exports = {
  async up(queryInterface) {
    const nextCategoryId = await createIdGenerator(queryInterface, "product_categories");
    const nextSubCategoryId = await createIdGenerator(queryInterface, "product_sub_categories");
    const nextProductId = await createIdGenerator(queryInterface, "products");
    const nextProductImageId = await createIdGenerator(queryInterface, "product_images");

    const categories = [
      {
        code: "HONEY",
        name: "Honey",
        description: "Natural honey products from Cameroon beekeeping zones.",
        sort_order: 1,
      },
      {
        code: "HONEY_DERIVED",
        name: "Honey Derived",
        description: "Products made from hive derivatives such as beeswax and propolis.",
        sort_order: 2,
      },
      {
        code: "BEEKEEPING_SUPPLY",
        name: "Beekeeping Supply",
        description: "Protective wear, harvest tools, and processing equipment.",
        sort_order: 3,
      },
      {
        code: "OTHER",
        name: "Other",
        description: "Other ecosystem products and curated bundles.",
        sort_order: 4,
      },
    ];

    const categoryIdByCode = new Map();
    for (const category of categories) {
      const existing = await rowByCode(queryInterface, "product_categories", category.code);
      if (existing) {
        categoryIdByCode.set(category.code, String(existing.id));
        continue;
      }

      const id = nextCategoryId();
      await queryInterface.bulkInsert("product_categories", [
        {
          id,
          lang: "en",
          code: category.code,
          name: category.name,
          description: category.description,
          sort_order: category.sort_order,
          is_active: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      categoryIdByCode.set(category.code, id);
    }

    const subCategories = [
      { code: "OKU_WHITE", name: "Oku White Honey", category: "HONEY", sort_order: 1 },
      { code: "MONTANE_WHITE", name: "Montane White Honey", category: "HONEY", sort_order: 2 },
      { code: "GOLD_HIGHLANDS", name: "Gold Highlands Honey", category: "HONEY", sort_order: 3 },
      { code: "WILDFLOWER_FOREST", name: "Wildflower/Forest Honey", category: "HONEY", sort_order: 4 },
      { code: "MONOFLORAL", name: "Monofloral Honeys", category: "HONEY", sort_order: 5 },

      { code: "BEESWAX", name: "Beeswax Products", category: "HONEY_DERIVED", sort_order: 1 },
      { code: "HONEY_BEVERAGE", name: "Honey-based Products and Beverages", category: "HONEY_DERIVED", sort_order: 2 },
      { code: "PROPOLIS", name: "Propolis-based Products", category: "HONEY_DERIVED", sort_order: 3 },
      { code: "ROYAL_JELLY", name: "Royal Jelly Products", category: "HONEY_DERIVED", sort_order: 4 },
      { code: "BEE_VENOM", name: "Bee Venom Products", category: "HONEY_DERIVED", sort_order: 5 },
      { code: "BEE_POLLEN", name: "Bee Pollen Products", category: "HONEY_DERIVED", sort_order: 6 },

      { code: "PROTECTIVE_HARVESTING", name: "Protective and Harvesting Tools", category: "BEEKEEPING_SUPPLY", sort_order: 1 },
      { code: "PRODUCTION_PROCESSING", name: "Production and Processing Equipment", category: "BEEKEEPING_SUPPLY", sort_order: 2 },
      { code: "PROCESSING_MAINTENANCE", name: "Processing and Maintenance Utilities", category: "BEEKEEPING_SUPPLY", sort_order: 3 },

      { code: "GENERAL_OTHER", name: "General Other", category: "OTHER", sort_order: 1 },
    ];

    const subCategoryIdByCode = new Map();
    for (const subCategory of subCategories) {
      const existing = await rowByCode(queryInterface, "product_sub_categories", subCategory.code);
      if (existing) {
        subCategoryIdByCode.set(subCategory.code, String(existing.id));
        continue;
      }

      const categoryId = categoryIdByCode.get(subCategory.category);
      if (!categoryId) continue;

      const id = nextSubCategoryId();
      await queryInterface.bulkInsert("product_sub_categories", [
        {
          id,
          lang: "en",
          category_id: categoryId,
          code: subCategory.code,
          name: subCategory.name,
          description: null,
          sort_order: subCategory.sort_order,
          is_active: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      subCategoryIdByCode.set(subCategory.code, id);
    }

    const products = [
      {
        slug: "oku-white-honey-500g",
        name: "Oku White Honey 500g",
        category: "HONEY",
        subCategory: "OKU_WHITE",
        price: 6500,
        stock: 120,
        region: "North West",
        measurementType: "MASS",
        measurementUnit: "GRAM",
        measurementValue: 500,
        netGrams: 500,
        netMilliliters: null,
        apparelSize: null,
        description:
          "Premium Oku white honey harvested from high-altitude floral zones with clean taste.",
        attributes: { source: "mountain apiary", purity: "raw" },
        images: [
          "https://source.unsplash.com/1600x1000/?honey,jar,glass&sig=101",
          "https://source.unsplash.com/1600x1000/?honeycomb,honey&sig=102",
          "https://source.unsplash.com/1600x1000/?beekeeper,honey&sig=103",
        ],
      },
      {
        slug: "montane-white-honey-1l",
        name: "Montane White Honey 1L",
        category: "HONEY",
        subCategory: "MONTANE_WHITE",
        price: 11000,
        stock: 80,
        region: "Adamawa",
        measurementType: "VOLUME",
        measurementUnit: "LITER",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: 1000,
        apparelSize: null,
        description: "Smooth montane honey in family-size bottle for daily use.",
        attributes: { source: "montane apiary" },
        images: [
          "https://source.unsplash.com/1600x1000/?honey,bottle&sig=104",
          "https://source.unsplash.com/1600x1000/?raw,honey&sig=105",
          "https://source.unsplash.com/1600x1000/?natural,sweetener&sig=106",
        ],
      },
      {
        slug: "wildflower-forest-honey-250g",
        name: "Wildflower Forest Honey 250g",
        category: "HONEY",
        subCategory: "WILDFLOWER_FOREST",
        price: 4000,
        stock: 150,
        region: "East",
        measurementType: "MASS",
        measurementUnit: "GRAM",
        measurementValue: 250,
        netGrams: 250,
        netMilliliters: null,
        apparelSize: null,
        description: "Aromatic forest honey blend with wildflower notes.",
        attributes: { source: "forest apiary" },
        images: [
          "https://source.unsplash.com/1600x1000/?wildflower,honey&sig=107",
          "https://source.unsplash.com/1600x1000/?honey,spoon&sig=108",
          "https://source.unsplash.com/1600x1000/?honey,toast&sig=109",
        ],
      },
      {
        slug: "beeswax-candle-set",
        name: "Pure Beeswax Candle Set",
        category: "HONEY_DERIVED",
        subCategory: "BEESWAX",
        price: 7500,
        stock: 60,
        region: "West",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 4,
        netGrams: null,
        netMilliliters: null,
        apparelSize: null,
        description: "Handcrafted beeswax candles with natural honey scent.",
        attributes: { units_per_pack: 4, burn_profile: "long" },
        images: [
          "https://source.unsplash.com/1600x1000/?beeswax,candle&sig=110",
          "https://source.unsplash.com/1600x1000/?candle,handmade&sig=111",
          "https://source.unsplash.com/1600x1000/?wax,candle&sig=112",
        ],
      },
      {
        slug: "propolis-soap-bar",
        name: "Propolis Soap Bar",
        category: "HONEY_DERIVED",
        subCategory: "PROPOLIS",
        price: 2500,
        stock: 200,
        region: "Centre",
        measurementType: "MASS",
        measurementUnit: "GRAM",
        measurementValue: 120,
        netGrams: 120,
        netMilliliters: null,
        apparelSize: null,
        description: "Propolis-enriched cleansing bar for sensitive skin.",
        attributes: { skin_type: "all", additives: "none" },
        images: [
          "https://source.unsplash.com/1600x1000/?soap,natural&sig=113",
          "https://source.unsplash.com/1600x1000/?propolis,soap&sig=114",
          "https://source.unsplash.com/1600x1000/?skincare,bar-soap&sig=115",
        ],
      },
      {
        slug: "honey-mead-classic-750ml",
        name: "Honey Mead Classic 750ml",
        category: "HONEY_DERIVED",
        subCategory: "HONEY_BEVERAGE",
        price: 9800,
        stock: 70,
        region: "Littoral",
        measurementType: "VOLUME",
        measurementUnit: "MILLILITER",
        measurementValue: 750,
        netGrams: null,
        netMilliliters: 750,
        apparelSize: null,
        description: "Fermented honey beverage with balanced floral profile.",
        attributes: { style: "mead", alcohol_percent: 11 },
        images: [
          "https://source.unsplash.com/1600x1000/?mead,honey,wine&sig=116",
          "https://source.unsplash.com/1600x1000/?bottle,drink,honey&sig=117",
          "https://source.unsplash.com/1600x1000/?fermented,drink&sig=118",
        ],
      },
      {
        slug: "beekeeper-suit-veil-l",
        name: "Beekeeper Suit with Veil - L",
        category: "BEEKEEPING_SUPPLY",
        subCategory: "PROTECTIVE_HARVESTING",
        price: 28500,
        stock: 25,
        region: "North West",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: "L",
        description: "Full protective suit with integrated veil for hive inspections.",
        attributes: { material: "cotton blend", includes_veil: true },
        images: [
          "https://source.unsplash.com/1600x1000/?beekeeper,suit&sig=119",
          "https://source.unsplash.com/1600x1000/?beekeeping,protective-gear&sig=120",
          "https://source.unsplash.com/1600x1000/?apiary,beekeeper&sig=121",
        ],
      },
      {
        slug: "beekeeper-gloves-xl",
        name: "Beekeeper Gloves - XL",
        category: "BEEKEEPING_SUPPLY",
        subCategory: "PROTECTIVE_HARVESTING",
        price: 6500,
        stock: 90,
        region: "North West",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: "XL",
        description: "Extended cuff gloves for safe harvesting and frame handling.",
        attributes: { material: "leather and canvas", cuff: "long" },
        images: [
          "https://source.unsplash.com/1600x1000/?protective,gloves&sig=122",
          "https://source.unsplash.com/1600x1000/?beekeeping,gloves&sig=123",
          "https://source.unsplash.com/1600x1000/?work,gloves&sig=124",
        ],
      },
      {
        slug: "stainless-steel-smoker",
        name: "Stainless Steel Smoker",
        category: "BEEKEEPING_SUPPLY",
        subCategory: "PROTECTIVE_HARVESTING",
        price: 12000,
        stock: 45,
        region: "West",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: null,
        description: "Durable smoker for calming bees during hive operations.",
        attributes: { body: "stainless steel", shielded: true },
        images: [
          "https://source.unsplash.com/1600x1000/?smoker,beekeeping&sig=125",
          "https://source.unsplash.com/1600x1000/?beekeeping,tool&sig=126",
          "https://source.unsplash.com/1600x1000/?hive,tool&sig=127",
        ],
      },
      {
        slug: "double-sieve-honey-filter",
        name: "Double-sieve Honey Filter",
        category: "BEEKEEPING_SUPPLY",
        subCategory: "PRODUCTION_PROCESSING",
        price: 14500,
        stock: 50,
        region: "Centre",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: null,
        description: "Food-grade stainless filter for clean honey extraction.",
        attributes: { mesh: "double", material: "stainless steel" },
        images: [
          "https://source.unsplash.com/1600x1000/?honey,filter&sig=128",
          "https://source.unsplash.com/1600x1000/?stainless,mesh&sig=129",
          "https://source.unsplash.com/1600x1000/?food,processing,equipment&sig=130",
        ],
      },
      {
        slug: "digital-refractometer-honey",
        name: "Digital Honey Refractometer",
        category: "BEEKEEPING_SUPPLY",
        subCategory: "PROCESSING_MAINTENANCE",
        price: 32500,
        stock: 18,
        region: "Centre",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: null,
        description: "Precision moisture testing for harvest quality control.",
        attributes: { mode: "digital", use_case: "moisture testing" },
        images: [
          "https://source.unsplash.com/1600x1000/?refractometer,laboratory&sig=131",
          "https://source.unsplash.com/1600x1000/?measurement,instrument&sig=132",
          "https://source.unsplash.com/1600x1000/?quality,control,device&sig=133",
        ],
      },
      {
        slug: "honey-gift-basket-premium",
        name: "Premium Honey Gift Basket",
        category: "OTHER",
        subCategory: "GENERAL_OTHER",
        price: 18000,
        stock: 40,
        region: "Centre",
        measurementType: "COUNT",
        measurementUnit: "UNIT",
        measurementValue: 1,
        netGrams: null,
        netMilliliters: null,
        apparelSize: null,
        description: "Curated honey lifestyle basket for seasonal gifting.",
        attributes: { includes: ["mini honey jars", "wood dipper", "gift wrap"] },
        images: [
          "https://source.unsplash.com/1600x1000/?gift,basket,honey&sig=134",
          "https://source.unsplash.com/1600x1000/?gift,packaging,natural&sig=135",
          "https://source.unsplash.com/1600x1000/?artisan,food,gift&sig=136",
        ],
      },
    ];

    const productIdBySlug = new Map();
    for (const product of products) {
      const existing = await rowBySlug(queryInterface, product.slug);
      const productImages = resolvedProductImages(product);
      if (existing) {
        await queryInterface.bulkUpdate(
          "products",
          {
            featured_image: productImages[0],
            updated_at: new Date(),
          },
          { id: existing.id },
        );
        productIdBySlug.set(product.slug, String(existing.id));
        continue;
      }

      const categoryId = categoryIdByCode.get(product.category);
      const subCategoryId = subCategoryIdByCode.get(product.subCategory) ?? null;
      if (!categoryId) continue;

      const id = nextProductId();
      await queryInterface.bulkInsert("products", [
        {
          id,
          lang: "en",
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          category_id: categoryId,
          sub_category_id: subCategoryId,
          stock_quantity: product.stock,
          origin_region: product.region,
          featured_image: productImages[0],
          measurement_type: product.measurementType,
          measurement_unit: product.measurementUnit,
          measurement_value: product.measurementValue,
          net_grams: product.netGrams,
          net_milliliters: product.netMilliliters,
          attributes: JSON.stringify(product.attributes),
          apparel_size: product.apparelSize,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      productIdBySlug.set(product.slug, id);
    }

    for (const product of products) {
      const productId = productIdBySlug.get(product.slug);
      if (!productId) continue;
      const productImages = resolvedProductImages(product);

      await queryInterface.sequelize.query(
        `
          DELETE FROM product_images
          WHERE product_id = :productId
            AND image_url LIKE 'https://source.unsplash.com/%'
        `,
        { replacements: { productId } },
      );

      for (const imageUrl of productImages) {
        const [existingRows] = await queryInterface.sequelize.query(
          `
            SELECT id
            FROM product_images
            WHERE product_id = :productId AND image_url = :imageUrl
            LIMIT 1
          `,
          { replacements: { productId, imageUrl } },
        );
        if (existingRows.length > 0) continue;

        await queryInterface.bulkInsert("product_images", [
          {
            id: nextProductImageId(),
            lang: "en",
            product_id: productId,
            image_url: imageUrl,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      }
    }
  },

  async down(queryInterface) {
    const productSlugs = [
      "oku-white-honey-500g",
      "montane-white-honey-1l",
      "wildflower-forest-honey-250g",
      "beeswax-candle-set",
      "propolis-soap-bar",
      "honey-mead-classic-750ml",
      "beekeeper-suit-veil-l",
      "beekeeper-gloves-xl",
      "stainless-steel-smoker",
      "double-sieve-honey-filter",
      "digital-refractometer-honey",
      "honey-gift-basket-premium",
    ];

    const [products] = await queryInterface.sequelize.query(
      `SELECT id FROM products WHERE slug IN (:slugs)`,
      { replacements: { slugs: productSlugs } },
    );
    const productIds = products.map((row) => row.id);

    if (productIds.length > 0) {
      await queryInterface.bulkDelete("product_images", { product_id: productIds });
      await queryInterface.bulkDelete("products", { id: productIds });
    }
  },
};

