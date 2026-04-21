"use strict";

const CONTENT_LANG_ENUM = ["en", "fr"];

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
    if (!(await tableExists(queryInterface, "article_comments"))) {
      await queryInterface.createTable("article_comments", {
        id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          primaryKey: true,
        },
        lang: {
          type: Sequelize.ENUM(...CONTENT_LANG_ENUM),
          allowNull: false,
          defaultValue: "en",
        },
        article_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "articles", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
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
    }

    if (!(await tableExists(queryInterface, "article_likes"))) {
      await queryInterface.createTable("article_likes", {
        id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          primaryKey: true,
        },
        lang: {
          type: Sequelize.ENUM(...CONTENT_LANG_ENUM),
          allowNull: false,
          defaultValue: "en",
        },
        article_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "articles", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
      await queryInterface.addConstraint("article_likes", {
        type: "unique",
        fields: ["article_id", "user_id"],
        name: "uq_article_like_user_article",
      });
    }
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "article_likes")) {
      await queryInterface.dropTable("article_likes");
    }
    if (await tableExists(queryInterface, "article_comments")) {
      await queryInterface.dropTable("article_comments");
    }
  },
};

