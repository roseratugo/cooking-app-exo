const express = require('express');
const Favorite = require('../models/favorite');
const Recipe = require('../models/recipe');

const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');


router.post('/favorite/:recipeId', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.params.recipeId;
        const response =  await Favorite.create({
             user_id : userId,
             recipe_id : recipeId
         
        });
    } catch (error) {
        console.error('Erreur lors de la création de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.get('/favorite/all',verifyToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const recipe = await Favorite.findAll({
            where: {
              user_id: userId
            },
            include: {
              model: Recipe,
            }
          });
        console.log(recipe);
        if (!recipe) {
            return res.status(404).json({ error: 'Recette non trouvée' });
        }
        res.json(recipe);
    } catch (error) {
        console.error('Erreur lors de la récupération de la recette:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});
router.delete('/favorite/delete/:recipeId', verifyToken, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const recipe = await Favorite.destroy({
            where: {
            id  :recipeId ,
          }});

        if (!recipe) {
            return res.status(404).json({ error: 'Recette introuvable' });
        }
      
   
        res.json({ message: 'Recette supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
