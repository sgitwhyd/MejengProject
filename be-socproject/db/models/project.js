'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' }),
				this.belongsTo(models.Categories, {
					foreignKey: 'CategoryId',
					as: 'categories',
				}),
				this.belongsTo(models.Tools, { foreignKey: 'ToolId', as: 'tools' });
		}
	}
	Project.init(
		{
			UserId: DataTypes.INTEGER,
			CategoryId: DataTypes.INTEGER,
			ToolId: DataTypes.ARRAY(DataTypes.INTEGER),
			title: DataTypes.STRING,
			desc: DataTypes.STRING,
			thumbnail_project_image: DataTypes.STRING,
			project_image: DataTypes.STRING,
			desc: DataTypes.STRING,
			url: DataTypes.STRING,
			total_views: DataTypes.INTEGER,
			total_likes: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Project',
		}
	);
	return Project;
};
