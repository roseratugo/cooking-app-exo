const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comments');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware'); 

// Route pour obtenir les informations de l'utilisateur
router.get('/userInfo', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: ['username']
        });

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur interne du serveur', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour obtenir les commentaires d'une recette spécifique
router.get('/comments/all/:id', verifyToken, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const comments = await Comment.findAll({
            where: { recipeId },
            include: [{ model: User, attributes: ['username'] }] // Inclure les informations de l'utilisateur associé
        });

        res.json(comments);
    } catch (error) {
        console.error('Erreur interne du serveur', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour créer un nouveau commentaire
router.post('/comments', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { text, recipeId } = req.body;
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newComment = await Comment.create({
            text,
            userId,
            recipeId
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Erreur lors de la création du commentaire :', error);
        res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
    }
});

module.exports = router;
