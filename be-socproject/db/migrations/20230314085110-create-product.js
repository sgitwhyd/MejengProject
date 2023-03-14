'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      CategoryId: {
        type: Sequelize.INTEGER
      },
      ToolId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      tittle: {
        type: Sequelize.STRING
      },
      thumbnail_product_image: {
        type: Sequelize.STRING
      },
      product_image: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      total_views: {
        type: Sequelize.INTEGER
      },
      total_likes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};