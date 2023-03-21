'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ReportCategories',
			[
				{
					name: 'Spam',
					slug: 'spam',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Porno',
					slug: 'porno',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Plagiarsm',
					slug: 'plagiarsm',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
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
