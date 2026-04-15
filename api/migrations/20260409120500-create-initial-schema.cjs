"use strict";

const CONTENT_LANG_ENUM = ["en", "fr"];
const USER_ROLE_ENUM = ["admin", "customer", "beekeeper", "lab_staff"];

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

function baseColumns(Sequelize) {
  return {
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
  };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const base = baseColumns(Sequelize);

    if (!(await tableExists(queryInterface, "users"))) {
      await queryInterface.createTable("users", {
        ...base,
        firstname: { type: Sequelize.STRING(50), allowNull: false },
        lastname: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password_hash: { type: Sequelize.STRING, allowNull: false },
        role: {
          type: Sequelize.ENUM(...USER_ROLE_ENUM),
          allowNull: false,
          defaultValue: "customer",
        },
        phone: { type: Sequelize.STRING, allowNull: false },
        location: { type: Sequelize.STRING, allowNull: true },
        avatar_url: { type: Sequelize.STRING, allowNull: true },
      });
    }

    if (!(await tableExists(queryInterface, "events"))) {
      await queryInterface.createTable("events", {
        ...base,
        title: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: false },
        location: { type: Sequelize.STRING, allowNull: false },
        event_date: { type: Sequelize.DATEONLY, allowNull: false },
        capacity: { type: Sequelize.INTEGER, allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "article_categories"))) {
      await queryInterface.createTable("article_categories", {
        ...base,
        name: { type: Sequelize.STRING(80), allowNull: false, unique: true },
      });
    }

    if (!(await tableExists(queryInterface, "newsletter_subscribers"))) {
      await queryInterface.createTable("newsletter_subscribers", {
        ...base,
        email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
        subscribed_at: { type: Sequelize.DATE, allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "beekeeper_applications"))) {
      await queryInterface.createTable("beekeeper_applications", {
        ...base,
        name: { type: Sequelize.STRING(120), allowNull: false },
        region: { type: Sequelize.STRING(80), allowNull: false },
        phone: { type: Sequelize.STRING(50), allowNull: false },
        experience: { type: Sequelize.INTEGER, allowNull: false },
        number_of_hives: { type: Sequelize.INTEGER, allowNull: false },
        status: { type: Sequelize.STRING(40), allowNull: false },
        submitted_at: { type: Sequelize.DATE, allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "beekeepers"))) {
      await queryInterface.createTable("beekeepers", {
        ...base,
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        name: { type: Sequelize.STRING(120), allowNull: false },
        region: { type: Sequelize.STRING(80), allowNull: false },
        farm_location: { type: Sequelize.STRING(200), allowNull: false },
        years_experience: { type: Sequelize.INTEGER, allowNull: false },
        certification_status: { type: Sequelize.STRING(50), allowNull: false },
        bio: { type: Sequelize.TEXT, allowNull: true },
      });
    }

    if (!(await tableExists(queryInterface, "apiaries"))) {
      await queryInterface.createTable("apiaries", {
        ...base,
        beekeeper_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "beekeepers", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        name: { type: Sequelize.STRING(120), allowNull: false },
        latitude: { type: Sequelize.DECIMAL(10, 6), allowNull: false },
        longitude: { type: Sequelize.DECIMAL(10, 6), allowNull: false },
        region: { type: Sequelize.STRING(50), allowNull: false },
        number_of_hives: { type: Sequelize.INTEGER, allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "honey_batches"))) {
      await queryInterface.createTable("honey_batches", {
        ...base,
        batch_code: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        beekeeper_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "beekeepers", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        apiary_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "apiaries", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        region: { type: Sequelize.STRING(50), allowNull: false },
        harvest_date: { type: Sequelize.DATEONLY, allowNull: false },
        floral_source: { type: Sequelize.STRING(120), allowNull: false },
        moisture_content: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
        certification_status: { type: Sequelize.STRING(60), allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "lab_tests"))) {
      await queryInterface.createTable("lab_tests", {
        ...base,
        sample_code: { type: Sequelize.STRING(100), allowNull: false },
        batch_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "honey_batches", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        requested_by: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        test_type: { type: Sequelize.STRING(60), allowNull: false },
        status: { type: Sequelize.STRING(30), allowNull: false },
        submitted_at: { type: Sequelize.DATE, allowNull: false },
        completed_at: { type: Sequelize.DATE, allowNull: true },
        report_url: { type: Sequelize.STRING(255), allowNull: true },
      });
    }

    if (!(await tableExists(queryInterface, "lab_results"))) {
      await queryInterface.createTable("lab_results", {
        ...base,
        lab_test_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "lab_tests", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        parameter: { type: Sequelize.STRING(200), allowNull: false },
        value: { type: Sequelize.DECIMAL(12, 4), allowNull: false },
        unit: { type: Sequelize.STRING(30), allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "orders"))) {
      await queryInterface.createTable("orders", {
        ...base,
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        status: { type: Sequelize.STRING(20), allowNull: false },
        total_price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
        payment_status: { type: Sequelize.STRING(20), allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "products"))) {
      await queryInterface.createTable("products", {
        ...base,
        name: { type: Sequelize.STRING(150), allowNull: false },
        slug: { type: Sequelize.STRING(150), allowNull: false, unique: true },
        description: { type: Sequelize.TEXT, allowNull: false },
        price: { type: Sequelize.DECIMAL(12, 2), allowNull: false },
        category: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "article_categories", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
        },
        stock_quantity: { type: Sequelize.INTEGER, allowNull: false },
        origin_region: { type: Sequelize.STRING(80), allowNull: false },
        featured_image: { type: Sequelize.STRING(500), allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "product_images"))) {
      await queryInterface.createTable("product_images", {
        ...base,
        product_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "products", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        image_url: { type: Sequelize.STRING(500), allowNull: false },
      });
    }

    if (!(await tableExists(queryInterface, "sessions"))) {
      await queryInterface.createTable("sessions", {
        ...base,
        user_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        refresh_token: { type: Sequelize.STRING(512), allowNull: false },
        expires_at: { type: Sequelize.DATE, allowNull: false },
      });
    }
  },

  async down(queryInterface) {
    const dropOrder = [
      "sessions",
      "product_images",
      "products",
      "orders",
      "lab_results",
      "lab_tests",
      "honey_batches",
      "apiaries",
      "beekeepers",
      "beekeeper_applications",
      "newsletter_subscribers",
      "article_categories",
      "events",
      "users",
    ];

    for (const tableName of dropOrder) {
      if (await tableExists(queryInterface, tableName)) {
        await queryInterface.dropTable(tableName);
      }
    }
  },
};
