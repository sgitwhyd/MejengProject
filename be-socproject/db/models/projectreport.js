'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProjectReport extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Project, {
				foreignKey: 'ProjectId',
				as: 'project',
			});
		}
	}
	ProjectReport.init(
		{
			UserId: DataTypes.INTEGER,
			ProjectId: DataTypes.INTEGER,
			ReportCategoryId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'ProjectReport',
		}
	);
	return ProjectReport;
};
