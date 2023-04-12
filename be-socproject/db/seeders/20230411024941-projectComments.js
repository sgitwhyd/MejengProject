'use strict';

const faker = require('@faker-js/faker');
const fake = faker.faker;

const projectComments = [...Array(10)].map((projectComment, index) => ({
	UserId: fake.mersenne.rand(2, 1),
	ProjectId: index + 1,
	body: fake.random.words(5),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Comments', projectComments, {});
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
