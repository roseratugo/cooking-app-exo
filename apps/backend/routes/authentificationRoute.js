const express = require('express');
const sequelize = require('../config');
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Regex pour vérifier le format du mot de passe
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Vérification des champs obligatoires
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Vérification du format du mot de passe
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 7 caractères, incluant au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.' });
    }

    try {
        // Vérification si l'utilisateur ou l'email existe déjà
        const existingUser = await User.findOne({ where: { username } });
        const existingEmail = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ error: 'Le nom d\'utilisateur est déjà utilisé.' });
        }

        if (existingEmail) {
            return res.status(409).json({ error: 'L\'adresse email est déjà utilisée.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // Utilisation d'un coût de hachage approprié

        // Création de l'utilisateur
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
        });

        // Réponse avec les informations de l'utilisateur créé
        res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
