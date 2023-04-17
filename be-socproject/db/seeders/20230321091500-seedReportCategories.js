'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ReportCategories',
			[
				{
					name: 'Plagiarism',
					slug: 'plagiarism',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Inappropiate',
					slug: 'inappropiate',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Sensitive',
					slug: 'sensitive',
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
