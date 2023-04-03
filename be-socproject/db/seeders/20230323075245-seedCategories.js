'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'Mobile',
					slug: 'mobile',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Web',
					slug: 'web',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Abstact Nature',
					slug: 'abstact-nature',
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
