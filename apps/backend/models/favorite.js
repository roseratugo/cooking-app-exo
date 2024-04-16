const { DataTypes } = require('sequelize');
const config= require('../config');


const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
  });
  

  

module.exports = Favorite;
