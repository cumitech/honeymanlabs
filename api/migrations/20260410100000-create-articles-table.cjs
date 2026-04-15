"use strict";

function normalizeTables(showAllTablesResult) {
  return showAllTablesResult.map((item) => {
    if (typeof item === "string") return item;
    if (item?.tableName) return item.tableName;
    return String(item);
  });
}

async function tableExists(queryInterface, tableName) {
  const tables = normalizeTables(await queryInterface.showAllTables());
  return tables.includes(tableName);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    if (await tableExists(queryInterface, "articles")) return;

    await queryInterface.createTable("articles", {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      lang: {
        type: Sequelize.ENUM("en", "fr"),
        allowNull: false,
        defaultValue: "en",
      },
      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(180),
        allowNull: false,
        unique: true,
      },
      excerpt: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "draft",
      },
      cover_image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      category_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: { model: "article_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      author_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "articles")) {
      await queryInterface.dropTable("articles");
    }
  },
};
