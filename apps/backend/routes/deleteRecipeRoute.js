const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const { verifyToken } = require('../middlewares/authMiddleware');

router.delete('/recipe/:recipeId', verifyToken, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.user.id;
        const recipe = await Recipe.findByPk(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recette introuvable' });
        }
        if (recipe.user_id !== userId) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer cette recette' });
        }

        await Recipe.destroy({ where: { id: recipeId } });

        res.json({ message: 'Recette supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
