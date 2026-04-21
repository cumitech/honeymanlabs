"use strict";

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

const PRODUCT_SEED = [
  { slug: "oku-white-honey-500g", category: "HONEY" },
  { slug: "montane-white-honey-1l", category: "HONEY" },
  { slug: "wildflower-forest-honey-250g", category: "HONEY" },
  { slug: "beeswax-candle-set", category: "HONEY_DERIVED" },
  { slug: "propolis-soap-bar", category: "HONEY_DERIVED" },
  { slug: "honey-mead-classic-750ml", category: "HONEY_DERIVED" },
  { slug: "beekeeper-suit-veil-l", category: "BEEKEEPING_SUPPLY" },
  { slug: "beekeeper-gloves-xl", category: "BEEKEEPING_SUPPLY" },
  { slug: "stainless-steel-smoker", category: "BEEKEEPING_SUPPLY" },
  { slug: "double-sieve-honey-filter", category: "BEEKEEPING_SUPPLY" },
  { slug: "digital-refractometer-honey", category: "BEEKEEPING_SUPPLY" },
  { slug: "honey-gift-basket-premium", category: "OTHER" },
];

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

async function rowBySlug(queryInterface, slug) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT id FROM products WHERE slug = :slug LIMIT 1`,
    { replacements: { slug } },
  );
  return rows[0] ?? null;
}

module.exports = {
  async up(queryInterface) {
    const nextProductImageId = await createIdGenerator(queryInterface, "product_images");

    for (const product of PRODUCT_SEED) {
      const row = await rowBySlug(queryInterface, product.slug);
      if (!row) continue;

      const productId = row.id;
      const images = IMAGE_LIBRARY[product.category] ?? IMAGE_LIBRARY.OTHER;

      await queryInterface.bulkUpdate(
        "products",
        { featured_image: images[0], updated_at: new Date() },
        { id: productId },
      );

      await queryInterface.sequelize.query(
        `
          DELETE FROM product_images
          WHERE product_id = :productId
            AND image_url LIKE 'https://source.unsplash.com/%'
        `,
        { replacements: { productId } },
      );

      for (const imageUrl of images) {
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

  async down() {},
};

