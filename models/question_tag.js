'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question_tag.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question_id:{
      type: DataTypes.UUID,
      references: {
        model: 'Question',
        key: 'id',
      },
      primaryKey: true,
    }, 
    tag_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Tag',
        key: 'id',
      },
      primaryKey: true,
    } 
  }, {
    sequelize,
    modelName: 'Question_tag',
  });
  return Question_tag;
};