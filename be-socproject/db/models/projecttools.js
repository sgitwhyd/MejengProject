'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectTools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      this.belongsToMany(models.Project ,{through: 'projectTools'}),
      this.belongsToMany(models.Tools ,{through: 'projectTools'})
    }
  }
  ProjectTools.init({
    ProjectId: DataTypes.INTEGER,
    ToolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectTools',
  });
  return ProjectTools;
};