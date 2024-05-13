const express = require('express');
const Recipe = require('../models/recipe');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/recipe/:recipeId', verifyToken, async (req, res) => {
    try {
        const { title, description, preparation_time, cooking_time, category } = req.body;
        const recipeId = req.params.recipeId;
        const userId = req.user.id;

       
        const recipe = await Recipe.findOne({
            where: {
                id: recipeId,
                user_id: userId
            }
        });
        if (!recipe) {
            return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cette recette" });
        }

        
        await Recipe.update(
            { title, description, preparation_time, cooking_time,ustensils,ingredients,recipe  },
            { where: { id: recipeId } }
        );

        res.json({ message: 'Recette mise à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
