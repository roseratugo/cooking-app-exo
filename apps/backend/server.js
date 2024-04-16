const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize'); // Importer Sequelize
const sequelize = require('./../backend/config'); // Importer l'objet Sequelize initialisé

const authentificationRoute = require("./routes/authentificationRoute");

const HOST = 'localhost' || process.env.HOST;
const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
}));


app.use("/", authentificationRoute);


// Utiliser sequelize.authenticate() pour tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    // Démarrer le serveur Express une fois que la connexion à la base de données est établie
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

