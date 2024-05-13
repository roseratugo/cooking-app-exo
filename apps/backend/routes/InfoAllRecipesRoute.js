const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            attributes: ['id', 'title', 'description', 'image_url'] 
        });
        res.json(recipes);
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
