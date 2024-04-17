
const express = require('express');
const Recipe = require('../models/recipe'); 
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware'); 


router.post('/recipes', verifyToken, async (req, res) => {
    const { title, description, preparation_time, cooking_time, category } = req.body;
    const userId = req.user.id;
    try {
        const newRecipe = await Recipe.create({
            title,
            description,
            preparation_time,
            cooking_time,
            user_id: userId,
            category
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Erreur lors de la création de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
