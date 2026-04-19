"use strict";

async function columnExists(queryInterface, table, column) {
  const desc = await queryInterface.describeTable(table);
  return Object.prototype.hasOwnProperty.call(desc, column);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    if (!(await columnExists(queryInterface, "users", "google_sub"))) {
      await queryInterface.addColumn("users", "google_sub", {
        type: Sequelize.STRING(128),
        allowNull: true,
        unique: true,
      });
    }
    if (!(await columnExists(queryInterface, "users", "facebook_id"))) {
      await queryInterface.addColumn("users", "facebook_id", {
        type: Sequelize.STRING(64),
        allowNull: true,
        unique: true,
      });
    }
    await queryInterface.changeColumn("users", "password_hash", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "phone", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    if (await columnExists(queryInterface, "users", "google_sub")) {
      await queryInterface.removeColumn("users", "google_sub");
    }
    if (await columnExists(queryInterface, "users", "facebook_id")) {
      await queryInterface.removeColumn("users", "facebook_id");
    }
    await queryInterface.changeColumn("users", "password_hash", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
