const { DataTypes } = require('sequelize');
const config = require('../../config');


class Ingredient {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  }
  
  module.exports = Ingredient;
  
