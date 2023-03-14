'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Categories', [
      {
        name_categories: 'Mobile Design',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name_categories:'Web Design',
        createdAt: new Date(),
        updatedAt: new Date()
    }, 
      {
        name_categories: 'UI Components',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('Tools', [
      {
        name_tools: 'Figma',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name_tools:'Adobe Photoshop',
        createdAt: new Date(),
        updatedAt: new Date()
    }, 
      {
        name_tools: 'Canva',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
