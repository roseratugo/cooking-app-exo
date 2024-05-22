const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérification si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Erreur d'authentification" });
        }

        // Vérification du mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Erreur d'authentification" });
        }

        // Génération du token d'authentification
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Réponse avec le token
        res.json({ message: 'Connexion établie', token });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

router.get('/', verifyToken, async (req, res) => {
    res.json({ message: 'postes protégés' });
});

module.exports = router;
