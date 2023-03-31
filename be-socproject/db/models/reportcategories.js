'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ReportCategories extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.Project, {
				through: 'ProjectReport',
				as: 'projectReportCategories',
				foreignKey: 'ReportCategoryId',
				otherId: 'ProjectId',
			});
		}
	}
	ReportCategories.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ReportCategories',
		}
	);
	return ReportCategories;
};
