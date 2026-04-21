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
    if (!(await tableExists(queryInterface, "products"))) return;

    if (await columnExists(queryInterface, "products", "category_id")) {
      await queryInterface.sequelize.query(`
        UPDATE products
        SET category_id = 'pcat_other'
        WHERE category_id IS NULL OR TRIM(category_id) = ''
      `);

      await queryInterface.changeColumn("products", "category_id", {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: { model: "product_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    }

    if (await columnExists(queryInterface, "products", "apparel_size")) {
      await queryInterface.changeColumn("products", "apparel_size", {
        type: Sequelize.ENUM(...APPAREL_SIZES),
        allowNull: true,
      });
    }

    const legacyColumns = [
      "category",
      "product_type",
      "weight_grams",
      "liters",
      "honey_type",
      "derived_family",
      "supply_family",
    ];

    for (const columnName of legacyColumns) {
      if (await columnExists(queryInterface, "products", columnName)) {
        await queryInterface.removeColumn("products", columnName);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    if (!(await tableExists(queryInterface, "products"))) return;

    if (!(await columnExists(queryInterface, "products", "category"))) {
      await queryInterface.addColumn("products", "category", {
        type: Sequelize.STRING(32),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "product_type"))) {
      await queryInterface.addColumn("products", "product_type", {
        type: Sequelize.STRING(32),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "weight_grams"))) {
      await queryInterface.addColumn("products", "weight_grams", {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "liters"))) {
      await queryInterface.addColumn("products", "liters", {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "honey_type"))) {
      await queryInterface.addColumn("products", "honey_type", {
        type: Sequelize.STRING(64),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "derived_family"))) {
      await queryInterface.addColumn("products", "derived_family", {
        type: Sequelize.STRING(64),
        allowNull: true,
      });
    }

    if (!(await columnExists(queryInterface, "products", "supply_family"))) {
      await queryInterface.addColumn("products", "supply_family", {
        type: Sequelize.STRING(64),
        allowNull: true,
      });
    }

    if (await columnExists(queryInterface, "products", "category_id")) {
      await queryInterface.changeColumn("products", "category_id", {
        type: Sequelize.STRING(32),
        allowNull: true,
      });
    }

    if (await columnExists(queryInterface, "products", "apparel_size")) {
      await queryInterface.changeColumn("products", "apparel_size", {
        type: Sequelize.STRING(8),
        allowNull: true,
      });
    }
  },
};

