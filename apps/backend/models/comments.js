const { DataTypes } = require('sequelize');
const config = require('../../config');

// models/Comment.js
class Comment {
    constructor(id, recipe_id, user_id, text, created_at) {
      this.id = id;
      this.recipe_id = recipe_id;
      this.user_id = user_id;
      this.text = text;
      this.created_at = created_at;
    }
  }
  
  
  

module.exports = Comment;
