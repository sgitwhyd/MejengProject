'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class RepliesComment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
			this.belongsTo(models.Comment, {
				foreignKey: 'CommentId',
				as: 'comment',
			});
		}
	}
	RepliesComment.init(
		{
			CommentId: DataTypes.INTEGER,
			UserId: DataTypes.INTEGER,
			body: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'RepliesComment',
		}
	);
	return RepliesComment;
};
