const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route pour télécharger une image
router.post('/image', upload.single('photo'), async (req, res) => {
  try {
    const imagePath = req.file.path; 
    const imageURL = `http://localhost:3000/${imagePath}`; // Créer l'URL de l'image
    
    // Ajouter l'URL de l'image à la réponse
    res.status(200).json({ imageURL: imageURL });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});


// Route pour créer une recette avec l'URL de l'image
router.post('/recipes', async (req, res) => {
  try {
    const { title, description, preparation_time, cooking_time, utensils, ingredients, recipe } = req.body;
    const userId = req.user.id;

    // Récupérer l'URL de l'image depuis le corps de la requête
    const imagePath = req.body.imagePath;

    const newRecipe = await Recipe.create({
      title,
      description,
      preparation_time,
      cooking_time,
      utensils,
      ingredients,
      recipe,
      user_id: userId,
      image_url: imagePath, 
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Erreur lors de la création de la recette:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
