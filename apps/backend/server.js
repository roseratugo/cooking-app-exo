const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize'); // Importer Sequelize
const sequelize = require('./config'); // Importer l'objet Sequelize initialisé

const authentificationRoute = require("./routes/authentificationRoute");
const loginRoute = require("./routes/loginRoute");
const updateUserRoute = require("./routes/updateUserRoute");
const infoUserRoute = require("./routes/infoUserRoute");
const  infoAllUserRoute = require("./routes/infoAllUserRoute");
const recipeRoute = require ("./routes/recipeRoute");
const infoAllRecipesRoute = require("./routes/InfoAllRecipesRoute");
const InfoRecipeRoute = require ("./routes/InfoRecipeRoute");
const updateRecipeRoute = require("./routes/updateRecipeRoute");
const deleteRecipeRoute = require ("./routes/deleteRecipeRoute");

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


app.use("/", authentificationRoute, loginRoute, updateUserRoute, infoUserRoute, infoAllUserRoute, recipeRoute, infoAllRecipesRoute, InfoRecipeRoute, updateRecipeRoute, deleteRecipeRoute );


sequelize.sync().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
});

