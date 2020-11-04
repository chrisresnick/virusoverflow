'use strict';
const {
  Model
} = require('sequelize');
const question = require('./question');
module.exports = (sequelize, DataTypes) => {
  class QuestionVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionVote.belongsTo(models.Question, { foreignKey: "questionId" })
      QuestionVote.belongsTo(models.User, { foreignKey: "userId" })
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
