'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			profle_picture: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			region: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			total_views: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			apreciation: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			role: {
				allowNull: false,
				type: Sequelize.ENUM(['admin', 'user']),
				defaultValue: 'user',
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			is_verify: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		await queryInterface.dropTable('Users');
	},
};
