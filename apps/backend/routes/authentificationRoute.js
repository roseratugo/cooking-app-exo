require('dotenv').config();
const express = require('express');
const sequelize = require('../config');
const router = express.Router();
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
        });
        res.json({ id: newUser.id, username: newUser.username, email: newUser.email });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        await bcrypt.compare(password, user.password)

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Connexion établie', token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;
