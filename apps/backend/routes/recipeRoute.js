
const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');


router.post('/recipe', verifyToken, async (req, res) => {
      try { 
      const { title, description, preparation_time, cooking_time, utensils, ingredients, recipe,image_url } = req.body;
      const userId = req.user.id;
    
        
 
        const newRecipe = await Recipe.create({
            title,
            description,
            preparation_time,
            cooking_time,
            utensils,
            ingredients,
            recipe,
            image_url,
            user_id: userId,

            
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Erreur lors de la création de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
