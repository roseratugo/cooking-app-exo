const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/test', verifyToken, async (req, res) => {
     const recipes = await Recipe.findAll({
            where: { user_id: req.user.id }
        });
        if (recipes.length === 0) {
            return res.status(404).json({ error: 'Aucune recette trouvée pour cet utilisateur' });
        }
        res.json(recipes);
});



module.exports = router;
