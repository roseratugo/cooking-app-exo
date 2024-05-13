const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

// Récupérer toutes les recettes d'un utilisateur spécifique
router.get('/user/recipes', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await Recipe.findAll({ where: { user_id: userId } });
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
