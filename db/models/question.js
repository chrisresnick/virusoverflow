'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Question.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    textArea: {
      allowNull: false,
      type: DataTypes.TEXT,
      
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
