const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize'); // Importer Sequelize
const sequelize = require('./config'); // Importer l'objet Sequelize initialisé
const path = require('path')

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
const emailRoute = require ("./routes/emailRoute");
const imageRoute = require ("./routes/ImageRoute");
const CommentsRoute = require ("./routes/CommentsRoute");
const RecipeUserIDRoute = require ("./routes/RecipeUserIDRoute");
const FavoriteRecipeRoute = require ("./routes/FavoriteRecipeRoute");
const UploadImageRoute = require ("./routes/UploadImageRoute");

const HOST = 'localhost' || process.env.HOST;
const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
  
}));
app.use("/images",express.static(path.join(__dirname,'/images')) )

app.use("/", authentificationRoute,
 loginRoute,
  updateUserRoute,
   infoUserRoute,
    infoAllUserRoute, 
    recipeRoute, 
    infoAllRecipesRoute,
     InfoRecipeRoute,
      updateRecipeRoute, 
      deleteRecipeRoute,
      emailRoute,
      imageRoute
      ,CommentsRoute,
      RecipeUserIDRoute,
      FavoriteRecipeRoute,
     UploadImageRoute,);

sequelize.sync().then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
});

