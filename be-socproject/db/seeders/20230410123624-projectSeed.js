'use strict';

const faker = require('@faker-js/faker');
const fake = faker.faker;

const projectName = fake.company.name();
const projectSlug = fake.helpers.slugify(projectName).toLocaleLowerCase();

const projects = [...Array(10)].map((project, index) => ({
	UserId: fake.mersenne.rand(2, 1),
	title: `${projectName} ${index + 1}`,
	slug: `${projectSlug}-${index + 1}`,
	desc: fake.lorem.paragraph(),
	thumbnail_project_image: fake.image.imageUrl(100, 100, 'project'),
	project_image: [
		fake.image.imageUrl(100, 100, 'project'),
		fake.image.imageUrl(100, 100, 'project'),
		fake.image.imageUrl(100, 100, 'project'),
	],
	url: fake.internet.url(),
	CategoryId: fake.mersenne.rand(3, 1),
	createdAt: new Date(),
	updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Projects', projects, {});
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
