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
      Question.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'user_id'
        }
      });

      Question.hasMany(models.Answer, {
        as: 'answers',
        foreignKey: {
          name: 'question_id'
        }
      });

      Question.belongsToMany(models.Tag, { 
        as: 'tags',
        through: 'Question_tag', 
        foreignKey: 'question_id'
      });

    }
  }
  Question.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    user_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};