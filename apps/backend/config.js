const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetcooking', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql' 
});

// Teste la connexion à la base de données
sequelize.sync()

module.exports = sequelize;
