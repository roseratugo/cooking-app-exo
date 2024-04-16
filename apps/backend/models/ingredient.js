const { DataTypes } = require('sequelize');
const config = require('../config');


const Ingredient = sequelize.define('Ingredient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  });
  
  module.exports = Ingredient;