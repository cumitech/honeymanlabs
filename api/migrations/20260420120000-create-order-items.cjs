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
    if (await tableExists(queryInterface, "order_items")) return;

    await queryInterface.createTable("order_items", {
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
      order_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: { model: "orders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      catalog_product_id: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      line_total: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "order_items")) {
      await queryInterface.dropTable("order_items");
    }
  },
};
