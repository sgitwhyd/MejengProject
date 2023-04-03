'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' }),
				this.belongsTo(models.Project, {
					foreignKey: 'ProjectId',
					as: 'project',
				});
			this.hasMany(models.RepliesComment, { as: 'repliesComment' });
		}
	}
	Comment.init(
		{
			UserId: DataTypes.INTEGER,
			ProjectId: DataTypes.INTEGER,
			body: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Comment',
		}
	);
	return Comment;
};
