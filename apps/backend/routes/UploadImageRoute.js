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
    const imageURL = `/${imagePath}`; // Créer l'URL de l'image
    
    // Ajouter l'URL de l'image à la réponse
    res.status(200).json({ imageURL: imageURL });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;