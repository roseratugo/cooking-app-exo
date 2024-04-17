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
    type: DataTypes.INTEGER
  },
  cooking_time: {
    type: DataTypes.TIME
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  category: {
    type: DataTypes.STRING
  }
});

module.exports = Recipe;