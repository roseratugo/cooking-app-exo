const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/recipe/test', verifyToken, async (req, res) => {
    
    const recipeId = req.params.recipeId;
    try {
        const recipe = await Recipe.findAll(recipeId, {
            where: { user_id: req.user.id }
        });
        if (!recipe) {
            return res.status(404).json({ error: 'Recette non trouvée' });
        }
        res.json(recipe);
    } catch (error) {
        console.error('Erreur lors de la récupération de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
