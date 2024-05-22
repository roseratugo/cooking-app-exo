const express = require('express');
const Recipe = require('../models/recipe');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/update/:recipeId', verifyToken, async (req, res) => {
    try {
        console.log(req.body);
        const { title, description, preparation_time,utensils, ingredients, recipe,image_url } = req.body;
        const recipeId = await Recipe.update({
            title,
            description,
            preparation_time,
            utensils,
            ingredients,
            recipe,
            image_url,
        }, {
            where: { id: req.params.recipeId }

        });
        res.status(201).json(recipeId);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
);

module.exports = router;
