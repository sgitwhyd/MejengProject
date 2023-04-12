'use strict';

const faker = require('@faker-js/faker');
const fake = faker.faker;

const projectReports = [...Array(10)].map((projectReport, index) => ({
	UserId: fake.mersenne.rand(2, 1),
	ProjectId: index + 1,
	ReportCategoryId: fake.mersenne.rand(3, 1),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('ProjectReports', projectReports, {});
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
