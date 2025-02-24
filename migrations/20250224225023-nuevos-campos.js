'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tambo");
    await
      await queryInterface.addColumn("Inseminacion", "url_image", {
        type: Sequelize.STRING,
        allowNull: true
      })
    await queryInterface.addColumn("TransaccionGanado", "comprobante", {
      type: Sequelize.STRING,
      allowNull: true
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
