"use strict";

const faker = require("@faker-js/faker");

const fake = faker.faker;

const categoriesName = ["Website", "Mobile", "Game"];

const categories = [...Array(3)].map((category, index) => ({
	name: categoriesName[index],
	slug: fake.helpers.slugify(categoriesName[index]).toLocaleLowerCase(),
	desc: fake.lorem.sentence(5),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Categories", categories, {});
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
