'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuestionVote.init({
    questionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isUpVote: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'QuestionVote',
  });
  return QuestionVote;
};
