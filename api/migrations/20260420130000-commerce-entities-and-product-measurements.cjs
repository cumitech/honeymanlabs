"use strict";

const CONTENT_LANG_ENUM = ["en", "fr"];
const PRODUCT_TYPES = ["HONEY", "HONEY_DERIVED", "BEEKEEPING_SUPPLY", "OTHER"];
const HONEY_TYPES = ["OKU_WHITE", "MONTANE_WHITE", "GOLD_HIGHLANDS", "WILDFLOWER_FOREST", "MONOFLORAL"];
const DERIVED_FAMILIES = [
  "BEESWAX",
  "HONEY_BEVERAGE",
  "PROPOLIS",
  "ROYAL_JELLY",
  "BEE_VENOM",
  "BEE_POLLEN",
  "OTHER",
];
const SUPPLY_FAMILIES = ["PROTECTIVE_HARVESTING", "PRODUCTION_PROCESSING", "PROCESSING_MAINTENANCE", "OTHER"];
const MEASUREMENT_TYPES = ["MASS", "VOLUME", "COUNT"];
const MEASUREMENT_UNITS = ["GRAM", "KILOGRAM", "MILLILITER", "LITER", "UNIT"];

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
      await queryInterface.sequelize.query(`
        UPDATE products
        SET product_type = CASE
          WHEN product_type = 'HONEY_PRODUCTS' THEN 'HONEY_DERIVED'
          WHEN product_type = 'FARM_PRODUCTS' THEN 'BEEKEEPING_SUPPLY'
          WHEN product_type = 'LAB_SUPPLIES' THEN 'BEEKEEPING_SUPPLY'
          ELSE product_type
        END
      `);

      await queryInterface.changeColumn("products", "product_type", {
        type: Sequelize.ENUM(...PRODUCT_TYPES),
        allowNull: false,
        defaultValue: "HONEY",
      });

      if (!(await columnExists(queryInterface, "products", "honey_type"))) {
        await queryInterface.addColumn("products", "honey_type", {
          type: Sequelize.ENUM(...HONEY_TYPES),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "products", "derived_family"))) {
        await queryInterface.addColumn("products", "derived_family", {
          type: Sequelize.ENUM(...DERIVED_FAMILIES),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "products", "supply_family"))) {
        await queryInterface.addColumn("products", "supply_family", {
          type: Sequelize.ENUM(...SUPPLY_FAMILIES),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "products", "measurement_type"))) {
        await queryInterface.addColumn("products", "measurement_type", {
          type: Sequelize.ENUM(...MEASUREMENT_TYPES),
          allowNull: false,
          defaultValue: "MASS",
        });
      }
      if (!(await columnExists(queryInterface, "products", "measurement_unit"))) {
        await queryInterface.addColumn("products", "measurement_unit", {
          type: Sequelize.ENUM(...MEASUREMENT_UNITS),
          allowNull: false,
          defaultValue: "GRAM",
        });
      }
      if (!(await columnExists(queryInterface, "products", "measurement_value"))) {
        await queryInterface.addColumn("products", "measurement_value", {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: false,
          defaultValue: 0,
        });
      }
      if (!(await columnExists(queryInterface, "products", "net_grams"))) {
        await queryInterface.addColumn("products", "net_grams", {
          type: Sequelize.DECIMAL(12, 3),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "products", "net_milliliters"))) {
        await queryInterface.addColumn("products", "net_milliliters", {
          type: Sequelize.DECIMAL(12, 3),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "products", "attributes"))) {
        await queryInterface.addColumn("products", "attributes", {
          type: Sequelize.JSON,
          allowNull: true,
        });
      }
    }

    if (await tableExists(queryInterface, "order_items")) {
      if (!(await columnExists(queryInterface, "order_items", "product_type"))) {
        await queryInterface.addColumn("order_items", "product_type", {
          type: Sequelize.STRING(32),
          allowNull: false,
          defaultValue: "HONEY",
        });
      }
      if (!(await columnExists(queryInterface, "order_items", "measurement_type"))) {
        await queryInterface.addColumn("order_items", "measurement_type", {
          type: Sequelize.STRING(32),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "order_items", "measurement_unit"))) {
        await queryInterface.addColumn("order_items", "measurement_unit", {
          type: Sequelize.STRING(32),
          allowNull: true,
        });
      }
      if (!(await columnExists(queryInterface, "order_items", "measurement_value"))) {
        await queryInterface.addColumn("order_items", "measurement_value", {
          type: Sequelize.DECIMAL(12, 3),
          allowNull: true,
        });
      }
    }

    if (!(await tableExists(queryInterface, "cart_items"))) {
      await queryInterface.createTable("cart_items", {
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
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        product_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "products", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      });
      await queryInterface.addConstraint("cart_items", {
        type: "unique",
        fields: ["user_id", "product_id"],
        name: "uq_cart_user_product",
      });
    }

    if (!(await tableExists(queryInterface, "wishlist_items"))) {
      await queryInterface.createTable("wishlist_items", {
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
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        product_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "products", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      });
      await queryInterface.addConstraint("wishlist_items", {
        type: "unique",
        fields: ["user_id", "product_id"],
        name: "uq_wishlist_user_product",
      });
    }
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "wishlist_items")) {
      await queryInterface.dropTable("wishlist_items");
    }

    if (await tableExists(queryInterface, "cart_items")) {
      await queryInterface.dropTable("cart_items");
    }

    if (await tableExists(queryInterface, "order_items")) {
      if (await columnExists(queryInterface, "order_items", "measurement_value")) {
        await queryInterface.removeColumn("order_items", "measurement_value");
      }
      if (await columnExists(queryInterface, "order_items", "measurement_unit")) {
        await queryInterface.removeColumn("order_items", "measurement_unit");
      }
      if (await columnExists(queryInterface, "order_items", "measurement_type")) {
        await queryInterface.removeColumn("order_items", "measurement_type");
      }
      if (await columnExists(queryInterface, "order_items", "product_type")) {
        await queryInterface.removeColumn("order_items", "product_type");
      }
    }

    if (await tableExists(queryInterface, "products")) {
      if (await columnExists(queryInterface, "products", "attributes")) {
        await queryInterface.removeColumn("products", "attributes");
      }
      if (await columnExists(queryInterface, "products", "net_milliliters")) {
        await queryInterface.removeColumn("products", "net_milliliters");
      }
      if (await columnExists(queryInterface, "products", "net_grams")) {
        await queryInterface.removeColumn("products", "net_grams");
      }
      if (await columnExists(queryInterface, "products", "measurement_value")) {
        await queryInterface.removeColumn("products", "measurement_value");
      }
      if (await columnExists(queryInterface, "products", "measurement_unit")) {
        await queryInterface.removeColumn("products", "measurement_unit");
      }
      if (await columnExists(queryInterface, "products", "measurement_type")) {
        await queryInterface.removeColumn("products", "measurement_type");
      }
      if (await columnExists(queryInterface, "products", "supply_family")) {
        await queryInterface.removeColumn("products", "supply_family");
      }
      if (await columnExists(queryInterface, "products", "derived_family")) {
        await queryInterface.removeColumn("products", "derived_family");
      }
      if (await columnExists(queryInterface, "products", "honey_type")) {
        await queryInterface.removeColumn("products", "honey_type");
      }
    }
  },
};

