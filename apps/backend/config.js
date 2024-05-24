const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetcooking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test de la connexion à la bdd
sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;