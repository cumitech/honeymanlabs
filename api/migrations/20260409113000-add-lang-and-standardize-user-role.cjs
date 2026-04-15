"use strict";

const TABLES_WITH_LANG = [
  "users",
  "events",
  "article_categories",
  "newsletter_subscribers",
  "beekeeper_applications",
  "beekeepers",
  "apiaries",
  "honey_batches",
  "lab_tests",
  "lab_results",
  "orders",
  "products",
  "product_images",
  "sessions",
];

async function hasColumn(queryInterface, tableName, columnName) {
  try {
    const table = await queryInterface.describeTable(tableName);
    return Object.prototype.hasOwnProperty.call(table, columnName);
  } catch {
    return false;
  }
}

async function hasTable(queryInterface, tableName) {
  try {
    await queryInterface.describeTable(tableName);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const tableName of TABLES_WITH_LANG) {
      const tableExists = await hasTable(queryInterface, tableName);
      if (!tableExists) continue;

      const exists = await hasColumn(queryInterface, tableName, "lang");
      if (!exists) {
        await queryInterface.addColumn(tableName, "lang", {
          type: Sequelize.ENUM("en", "fr"),
          allowNull: false,
          defaultValue: "en",
        });
      }
    }

    const usersTableExists = await hasTable(queryInterface, "users");
    if (usersTableExists) {
      await queryInterface.changeColumn("users", "role", {
        type: Sequelize.ENUM("admin", "customer", "beekeeper", "lab_staff"),
        allowNull: false,
        defaultValue: "customer",
      });
    }
  },

  async down(queryInterface, Sequelize) {
    for (const tableName of TABLES_WITH_LANG) {
      const tableExists = await hasTable(queryInterface, tableName);
      if (!tableExists) continue;

      const exists = await hasColumn(queryInterface, tableName, "lang");
      if (exists) {
        await queryInterface.removeColumn(tableName, "lang");
      }
    }

    const usersTableExists = await hasTable(queryInterface, "users");
    if (usersTableExists) {
      await queryInterface.changeColumn("users", "role", {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "customer",
      });
    }
  },
};
