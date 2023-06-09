'use strict';

const faker = require('@faker-js/faker');

const fake = faker.faker;

const toolsName = [
	'Figma',
	'Adobe XD',
	'Adobe Photoshop',
	'Adobe Illustrator',
	'Adobe InDesign',
];

const tools = [...Array(5)].map((tool, index) => ({
	name: toolsName[index],
	slug: fake.helpers.slugify(toolsName[index]).toLocaleLowerCase(),
	icon: fake.image.imageUrl(100, 100, 'tools'),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Tools', tools, {});
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
