'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tools extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// this.belongsToMany(models.Project, {through:'ProjectTools'}
			this.belongsToMany(models.Project, {
				through: 'ProjectTools',
				as: 'project',
				foreignKey: 'ToolId',
				otherId: 'ProjectId'
			});
		}
	}
	Tools.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Tools',
		}
	);
	return Tools;
};
