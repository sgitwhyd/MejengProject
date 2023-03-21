'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Projects', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
			},
			CategoryId: {
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			thumbnail_project_image: {
				type: Sequelize.STRING,
			},
			project_image: {
				type: Sequelize.STRING,
			},
			desc: {
				type: Sequelize.STRING,
			},
			url: {
				type: Sequelize.STRING,
			},
			total_views: {
				type: Sequelize.INTEGER,
			},
			total_likes: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Projects');
	},
};
