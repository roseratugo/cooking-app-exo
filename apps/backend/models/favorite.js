const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Recipe = require('./recipe');
const User = require ("./user")
const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Recipes',
      key: 'id'
    }
  }
});

User.hasMany(Recipe, { foreignKey: 'user_id' });
Recipe.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'user_id', as: 'Favorites' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipe_id', as: 'FavoredBy' });

// Ensure Favorite knows about its associations
Favorite.belongsTo(User, { foreignKey: 'user_id' });
Favorite.belongsTo(Recipe, { foreignKey: 'recipe_id' });

module.exports = Favorite;