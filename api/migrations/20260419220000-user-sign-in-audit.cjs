"use strict";

async function columnExists(queryInterface, table, column) {
  const desc = await queryInterface.describeTable(table);
  return Object.prototype.hasOwnProperty.call(desc, column);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const t = "users";
    if (!(await columnExists(queryInterface, t, "last_sign_in_at"))) {
      await queryInterface.addColumn(t, "last_sign_in_at", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "last_sign_in_method"))) {
      await queryInterface.addColumn(t, "last_sign_in_method", {
        type: Sequelize.STRING(32),
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "last_sign_in_client"))) {
      await queryInterface.addColumn(t, "last_sign_in_client", {
        type: Sequelize.STRING(16),
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "last_sign_in_device_label"))) {
      await queryInterface.addColumn(t, "last_sign_in_device_label", {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "last_sign_in_user_agent"))) {
      await queryInterface.addColumn(t, "last_sign_in_user_agent", {
        type: Sequelize.STRING(512),
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "last_sign_in_ip"))) {
      await queryInterface.addColumn(t, "last_sign_in_ip", {
        type: Sequelize.STRING(64),
        allowNull: true,
      });
    }
    if (!(await columnExists(queryInterface, t, "sign_in_count"))) {
      await queryInterface.addColumn(t, "sign_in_count", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      });
    }
  },

  async down(queryInterface) {
    const t = "users";
    const cols = [
      "last_sign_in_at",
      "last_sign_in_method",
      "last_sign_in_client",
      "last_sign_in_device_label",
      "last_sign_in_user_agent",
      "last_sign_in_ip",
      "sign_in_count",
    ];
    for (const c of cols) {
      if (await columnExists(queryInterface, t, c)) {
        await queryInterface.removeColumn(t, c);
      }
    }
  },
};
