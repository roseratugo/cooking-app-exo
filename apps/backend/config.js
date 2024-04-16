const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetcooking', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql' 
});

// Teste la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize;
