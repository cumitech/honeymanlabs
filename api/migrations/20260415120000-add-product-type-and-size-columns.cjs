"use strict";

/** Product classification + size: liquid honey (L + weight), processed honey (weight), apparel (S–XXL). */

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = "products";

    await queryInterface.addColumn(table, "product_type", {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: "HONEY",
    });

    await queryInterface.addColumn(table, "weight_grams", {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    });

    await queryInterface.addColumn(table, "liters", {
      type: Sequelize.DECIMAL(12, 4),
      allowNull: true,
    });

    await queryInterface.addColumn(table, "apparel_size", {
      type: Sequelize.STRING(8),
      allowNull: true,
    });
  },

  async down(queryInterface) {
    const table = "products";
    await queryInterface.removeColumn(table, "apparel_size");
    await queryInterface.removeColumn(table, "liters");
    await queryInterface.removeColumn(table, "weight_grams");
    await queryInterface.removeColumn(table, "product_type");
  },
};
