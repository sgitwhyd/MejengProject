'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Project, { as: 'project' });
			this.hasMany(models.Comment, { as: 'comment' });
			this.hasMany(models.RepliesComment, { as: 'repliesComment' });
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
			profile_image: DataTypes.STRING,
			description: DataTypes.STRING,
			region: DataTypes.STRING,
			country: DataTypes.STRING,
			role: DataTypes.ENUM(['Admin', 'User']),
			is_active: DataTypes.BOOLEAN,
			is_verify: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
