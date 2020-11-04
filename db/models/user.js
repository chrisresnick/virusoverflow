'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Answer, {foreignKey: 'userId'})
      User.hasMany(models.Question, {foreignKey: 'userId'})
      // User.hasMany(models.questionVote, {foreignKey: 'userId'})
      // User.hasMany(models.answerVote, {foreignKey: 'userId'})
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
