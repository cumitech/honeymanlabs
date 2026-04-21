"use strict";

const CONTENT_LANG_ENUM = ["en", "fr"];

const CATEGORY_ROWS = [
  { id: "pcat_honey", code: "HONEY", name: "Honey" },
  { id: "pcat_honey_derived", code: "HONEY_DERIVED", name: "Honey Derived" },
  { id: "pcat_beekeeping_supply", code: "BEEKEEPING_SUPPLY", name: "Beekeeping Supply" },
  { id: "pcat_other", code: "OTHER", name: "Other" },
];

const SUB_CATEGORY_ROWS = [
  { id: "psc_oku_white", category_id: "pcat_honey", code: "OKU_WHITE", name: "Oku White Honey" },
  { id: "psc_montane_white", category_id: "pcat_honey", code: "MONTANE_WHITE", name: "Montane White Honey" },
  { id: "psc_gold_highlands", category_id: "pcat_honey", code: "GOLD_HIGHLANDS", name: "Gold Highlands Honey" },
  { id: "psc_wildflower_forest", category_id: "pcat_honey", code: "WILDFLOWER_FOREST", name: "Wildflower/Forest Honey" },
  { id: "psc_monofloral", category_id: "pcat_honey", code: "MONOFLORAL", name: "Monofloral Honeys" },

  { id: "psc_beeswax", category_id: "pcat_honey_derived", code: "BEESWAX", name: "Beeswax Products" },
  { id: "psc_honey_beverage", category_id: "pcat_honey_derived", code: "HONEY_BEVERAGE", name: "Honey-based Beverages" },
  { id: "psc_propolis", category_id: "pcat_honey_derived", code: "PROPOLIS", name: "Propolis Products" },
  { id: "psc_royal_jelly", category_id: "pcat_honey_derived", code: "ROYAL_JELLY", name: "Royal Jelly Products" },
  { id: "psc_bee_venom", category_id: "pcat_honey_derived", code: "BEE_VENOM", name: "Bee Venom Products" },
  { id: "psc_bee_pollen", category_id: "pcat_honey_derived", code: "BEE_POLLEN", name: "Bee Pollen Products" },

  { id: "psc_protective_harvesting", category_id: "pcat_beekeeping_supply", code: "PROTECTIVE_HARVESTING", name: "Protective and Harvesting Tools" },
  { id: "psc_production_processing", category_id: "pcat_beekeeping_supply", code: "PRODUCTION_PROCESSING", name: "Production and Processing Equipment" },
  { id: "psc_processing_maintenance", category_id: "pcat_beekeeping_supply", code: "PROCESSING_MAINTENANCE", name: "Processing and Maintenance Utilities" },
];

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
    if (!(await tableExists(queryInterface, "product_categories"))) {
      await queryInterface.createTable("product_categories", {
        id: { type: Sequelize.STRING(32), allowNull: false, primaryKey: true },
        lang: { type: Sequelize.ENUM(...CONTENT_LANG_ENUM), allowNull: false, defaultValue: "en" },
        code: { type: Sequelize.STRING(64), allowNull: false, unique: true },
        name: { type: Sequelize.STRING(120), allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },
        sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
        updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      });
    }

    if (!(await tableExists(queryInterface, "product_sub_categories"))) {
      await queryInterface.createTable("product_sub_categories", {
        id: { type: Sequelize.STRING(32), allowNull: false, primaryKey: true },
        lang: { type: Sequelize.ENUM(...CONTENT_LANG_ENUM), allowNull: false, defaultValue: "en" },
        category_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "product_categories", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        code: { type: Sequelize.STRING(64), allowNull: false, unique: true },
        name: { type: Sequelize.STRING(120), allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },
        sort_order: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
        updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      });
    }

    for (const row of CATEGORY_ROWS) {
      await queryInterface.sequelize.query(
        `
          INSERT INTO product_categories (id, lang, code, name, description, sort_order, is_active, created_at, updated_at)
          VALUES (:id, 'en', :code, :name, NULL, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON DUPLICATE KEY UPDATE code = VALUES(code), name = VALUES(name), updated_at = CURRENT_TIMESTAMP
        `,
        { replacements: row },
      );
    }

    for (const row of SUB_CATEGORY_ROWS) {
      await queryInterface.sequelize.query(
        `
          INSERT INTO product_sub_categories (id, lang, category_id, code, name, description, sort_order, is_active, created_at, updated_at)
          VALUES (:id, 'en', :category_id, :code, :name, NULL, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), code = VALUES(code), name = VALUES(name), updated_at = CURRENT_TIMESTAMP
        `,
        { replacements: row },
      );
    }

    if (await tableExists(queryInterface, "products")) {
      if (!(await columnExists(queryInterface, "products", "category_id"))) {
        await queryInterface.addColumn("products", "category_id", {
          type: Sequelize.STRING(32),
          allowNull: true,
          references: { model: "product_categories", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        });
      }

      if (!(await columnExists(queryInterface, "products", "sub_category_id"))) {
        await queryInterface.addColumn("products", "sub_category_id", {
          type: Sequelize.STRING(32),
          allowNull: true,
          references: { model: "product_sub_categories", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      }

      await queryInterface.sequelize.query(`
        UPDATE products
        SET category_id = CASE
          WHEN product_type = 'HONEY_DERIVED' THEN 'pcat_honey_derived'
          WHEN product_type = 'BEEKEEPING_SUPPLY' THEN 'pcat_beekeeping_supply'
          WHEN product_type = 'OTHER' THEN 'pcat_other'
          ELSE 'pcat_honey'
        END
        WHERE category_id IS NULL
      `);

      await queryInterface.sequelize.query(`
        UPDATE products
        SET sub_category_id = CASE
          WHEN honey_type = 'OKU_WHITE' THEN 'psc_oku_white'
          WHEN honey_type = 'MONTANE_WHITE' THEN 'psc_montane_white'
          WHEN honey_type = 'GOLD_HIGHLANDS' THEN 'psc_gold_highlands'
          WHEN honey_type = 'WILDFLOWER_FOREST' THEN 'psc_wildflower_forest'
          WHEN honey_type = 'MONOFLORAL' THEN 'psc_monofloral'
          WHEN derived_family = 'BEESWAX' THEN 'psc_beeswax'
          WHEN derived_family = 'HONEY_BEVERAGE' THEN 'psc_honey_beverage'
          WHEN derived_family = 'PROPOLIS' THEN 'psc_propolis'
          WHEN derived_family = 'ROYAL_JELLY' THEN 'psc_royal_jelly'
          WHEN derived_family = 'BEE_VENOM' THEN 'psc_bee_venom'
          WHEN derived_family = 'BEE_POLLEN' THEN 'psc_bee_pollen'
          WHEN supply_family = 'PROTECTIVE_HARVESTING' THEN 'psc_protective_harvesting'
          WHEN supply_family = 'PRODUCTION_PROCESSING' THEN 'psc_production_processing'
          WHEN supply_family = 'PROCESSING_MAINTENANCE' THEN 'psc_processing_maintenance'
          ELSE sub_category_id
        END
      `);

      await queryInterface.changeColumn("products", "category_id", {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: { model: "product_categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      });
    }

    if (await tableExists(queryInterface, "order_items")) {
      if (!(await columnExists(queryInterface, "order_items", "category_id"))) {
        await queryInterface.addColumn("order_items", "category_id", {
          type: Sequelize.STRING(32),
          allowNull: false,
          defaultValue: "pcat_honey",
        });
      }

      if (!(await columnExists(queryInterface, "order_items", "sub_category_id"))) {
        await queryInterface.addColumn("order_items", "sub_category_id", {
          type: Sequelize.STRING(32),
          allowNull: true,
        });
      }

      if (await columnExists(queryInterface, "order_items", "product_type")) {
        await queryInterface.sequelize.query(`
          UPDATE order_items
          SET category_id = CASE
            WHEN product_type = 'HONEY_DERIVED' THEN 'pcat_honey_derived'
            WHEN product_type = 'BEEKEEPING_SUPPLY' THEN 'pcat_beekeeping_supply'
            WHEN product_type = 'OTHER' THEN 'pcat_other'
            ELSE 'pcat_honey'
          END
        `);
        await queryInterface.removeColumn("order_items", "product_type");
      }
    }
  },

  async down(queryInterface) {
    if (await tableExists(queryInterface, "order_items")) {
      if (await columnExists(queryInterface, "order_items", "sub_category_id")) {
        await queryInterface.removeColumn("order_items", "sub_category_id");
      }
      if (await columnExists(queryInterface, "order_items", "category_id")) {
        await queryInterface.removeColumn("order_items", "category_id");
      }
    }

    if (await tableExists(queryInterface, "products")) {
      if (await columnExists(queryInterface, "products", "sub_category_id")) {
        await queryInterface.removeColumn("products", "sub_category_id");
      }
      if (await columnExists(queryInterface, "products", "category_id")) {
        await queryInterface.removeColumn("products", "category_id");
      }
    }

    if (await tableExists(queryInterface, "product_sub_categories")) {
      await queryInterface.dropTable("product_sub_categories");
    }

    if (await tableExists(queryInterface, "product_categories")) {
      await queryInterface.dropTable("product_categories");
    }
  },
};

