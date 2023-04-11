'use strict';

const faker = require('@faker-js/faker');
const fake = faker.faker;

const projectHasTools = [...Array(10)].map((productHasTool, index) => ({
	ProjectId: index + 1,
	ToolId: fake.mersenne.rand(3, 1),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('ProjectTools', projectHasTools, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
