'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
      // Answer.hasMany(models.answerVotes, { foreignKey: 'answerId' })
      // define association here
    }
  };
  Answer.init({
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    textField: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
