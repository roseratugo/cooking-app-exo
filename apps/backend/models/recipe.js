const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  preparation_time: {
    type: DataTypes.TIME
  },
  utensils: {
    type: DataTypes.STRING 
  },
  ingredients: {
    type: DataTypes.TEXT 
  },
  recipe: {
    type: DataTypes.TEXT 
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  image_url: {
    type: DataTypes.STRING 
  }
});

module.exports = Recipe;
