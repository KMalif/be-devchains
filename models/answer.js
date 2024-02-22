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
    static associate(models) {
      // define association here
      Answer.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'user_id'
        }
      })

      Answer.belongsTo(models.Question, {
        as: 'question',
        foreignKey: {
          name: 'question_id'
        }
      })
    }
  }
  Answer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    question_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};