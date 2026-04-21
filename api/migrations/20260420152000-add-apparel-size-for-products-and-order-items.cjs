"use strict";

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

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

async function columnExists(queryInterface, tableName, columnName) {
  const table = await queryInterface.describeTable(tableName);
  return !!table[columnName];
}

module.exports = {
  async up(queryInterface, Sequelize) {
    if (await tableExists(queryInterface, "products")) {
      if (!(await columnExists(queryInterface, "products", "apparel_size"))) {
        await queryInterface.addColumn("products", "apparel_size", {
          type: Sequelize.ENUM(...APPAREL_SIZES),
          allowNull: true,
        });
      }
    }

    if (await tableExists(queryInterface, "order_items")) {
      if (!(await columnExists(queryInterface, "order_items", "apparel_size"))) {
        await queryInterface.addColumn("order_items", "apparel_size", {
          type: Sequelize.STRING(8),
          allowNull: true,
        });
      }
    }
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "order_items")) {
      if (await columnExists(queryInterface, "order_items", "apparel_size")) {
        await queryInterface.removeColumn("order_items", "apparel_size");
      }
    }

    if (await tableExists(queryInterface, "products")) {
      if (await columnExists(queryInterface, "products", "apparel_size")) {
        await queryInterface.removeColumn("products", "apparel_size");
      }
    }
  },
};

