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
      // // // define association here
      // this.belongsToMany(models.Project ,{through: 'projectTools', as: 'project', foreignKey: 'ProjectId'}),
      // this.belongsToMany(models.Tools ,{through: 'projectTools', as: 'tools', foreignKey: 'ToolId'})
      // this.hasMany(models.Tools)
      // this.belongsTo(models.Project)
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