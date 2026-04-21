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

module.exports = {
  async up(queryInterface) {
    const nextCategoryId = await createIdGenerator(queryInterface, "article_categories");
    const nextArticleId = await createIdGenerator(queryInterface, "articles");

    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users ORDER BY created_at ASC LIMIT 1`,
    );
    if (users.length === 0) return;
    const authorId = users[0].id;

    const categories = [
      { name: "Beekeeping Basics" },
      { name: "Honey Quality & Testing" },
      { name: "Market & Product Development" },
    ];

    const categoryIdByName = new Map();
    for (const category of categories) {
      const [existingRows] = await queryInterface.sequelize.query(
        `SELECT id FROM article_categories WHERE name = :name LIMIT 1`,
        { replacements: { name: category.name } },
      );
      if (existingRows.length > 0) {
        categoryIdByName.set(category.name, existingRows[0].id);
        continue;
      }

      const id = nextCategoryId();
      await queryInterface.bulkInsert("article_categories", [
        {
          id,
          lang: "en",
          name: category.name,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
      categoryIdByName.set(category.name, id);
    }

    const articles = [
      {
        title: "How to identify pure honey in local markets",
        slug: "identify-pure-honey-local-markets",
        excerpt: "Five practical checks every cooperative and household can use before buying bulk honey.",
        content:
          "Pure honey quality begins with trusted sourcing, moisture checks, and clean handling from hive to jar. In field programs across Cameroon, producers consistently reduce adulteration by documenting harvest lots, using proper filtering tools, and validating moisture levels before sale. This guide explains practical checks, warning signs, and record-keeping habits that improve buyer confidence.",
        category: "Honey Quality & Testing",
        cover_image:
          "https://images.unsplash.com/photo-1668510468038-3607aae3f03c?auto=format&fit=crop&w=1600&h=1000&q=80",
      },
      {
        title: "Protective gear checklist for safer hive inspections",
        slug: "protective-gear-checklist-hive-inspections",
        excerpt: "A practical PPE checklist for veils, suits, gloves, and smoker handling before every inspection.",
        content:
          "Safe hive work depends on consistent protective gear use and proper smoker management. Teams should verify suit integrity, glove sizing, and veil fit before opening colonies. This checklist provides a reusable process for pre-inspection preparation, safe handling around active colonies, and post-inspection sanitation.",
        category: "Beekeeping Basics",
        cover_image:
          "https://images.unsplash.com/photo-1758522965366-a6ab0e8f2e63?auto=format&fit=crop&w=1600&h=1000&q=80",
      },
      {
        title: "Building value-added products from beeswax and propolis",
        slug: "value-added-products-beeswax-propolis",
        excerpt: "From candles to skin-care products, learn packaging and quality tips for derived hive products.",
        content:
          "Derived hive products can diversify beekeeper income when quality and traceability are managed well. Beeswax and propolis processing requires clean inputs, consistent batch notes, and clear packaging labels. This article outlines product ideas, basic quality controls, and market presentation practices that help producers scale responsibly.",
        category: "Market & Product Development",
        cover_image:
          "https://images.unsplash.com/photo-1646171638130-9eefc42feaab?auto=format&fit=crop&w=1600&h=1000&q=80",
      },
    ];

    for (const article of articles) {
      const [existingRows] = await queryInterface.sequelize.query(
        `SELECT id FROM articles WHERE slug = :slug LIMIT 1`,
        { replacements: { slug: article.slug } },
      );
      if (existingRows.length > 0) continue;
      const categoryId = categoryIdByName.get(article.category);
      if (!categoryId) continue;

      await queryInterface.bulkInsert("articles", [
        {
          id: nextArticleId(),
          lang: "en",
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          status: "published",
          cover_image: article.cover_image,
          category_id: categoryId,
          author_id: authorId,
          published_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface) {
    const slugs = [
      "identify-pure-honey-local-markets",
      "protective-gear-checklist-hive-inspections",
      "value-added-products-beeswax-propolis",
    ];
    await queryInterface.bulkDelete("articles", { slug: slugs });
    await queryInterface.bulkDelete("article_categories", {
      name: ["Beekeeping Basics", "Honey Quality & Testing", "Market & Product Development"],
    });
  },
};

