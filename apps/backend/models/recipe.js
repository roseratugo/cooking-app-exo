const { DataTypes } = require('sequelize');
const config= require('../../config');


class Recipe {
    constructor(id, title, description, preparation_time, cooking_time, user_id, category) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.preparation_time = preparation_time;
      this.cooking_time = cooking_time;
      this.user_id = user_id;
      this.category = category;
    }
  }
  
  module.exports = Recipe;
  
