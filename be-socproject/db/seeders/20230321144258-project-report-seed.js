'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ProjectReports',
			[
				{
					ProjectId: 1,
					ReportCategoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					ProjectId: 1,
					ReportCategoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					ProjectId: 3,
					ReportCategoryId: 1,
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
