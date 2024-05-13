const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware');

router.put('/user/:userId',verifyToken, async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.query.token; 
        if (!token) {
            return res.status(401).json({ error: 'Token non fourni' });
        }

        // Vérifier le token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Vérifier si l'ID utilisateur correspond à celui spécifié dans l'URL
        if (userId !== parseInt(req.params.userId)) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier cet utilisateur' });
        }

        // Récupérer l'utilisateur à mettre à jour
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Mettre à jour le mot de passe de l'utilisateur
        await user.update({ password: hashedPassword });

        const newToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ message: 'Mot de passe mis à jour avec succès', token: newToken });
    } catch (error) {
        console.error('Erreur lors de la modification du mot de passe :', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token invalide' });
        }
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
