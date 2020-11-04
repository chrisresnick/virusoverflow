'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerVotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AnswerVotes.init({
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isUpVote: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AnswerVotes',
  });
  return AnswerVotes;
};