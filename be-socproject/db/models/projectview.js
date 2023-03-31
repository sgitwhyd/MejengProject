'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProjectView extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Project, { foreignKey: 'ProjectId' });
		}
	}
	ProjectView.init(
		{
			ProjectId: DataTypes.INTEGER,
			ip_address: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ProjectView',
		}
	);
	return ProjectView;
};
