const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetcooking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Successfully connected to the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;