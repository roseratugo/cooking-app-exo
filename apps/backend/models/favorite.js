const { DataTypes } = require('sequelize');
const config= require('../../config');

// models/Favorite.js
class Favorite {
    constructor(id, user_id, recipe_id) {
      this.id = id;
      this.user_id = user_id;
      this.recipe_id = recipe_id;
    }
  }
  

  

module.exports = Favorite;
