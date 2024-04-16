const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { 
            [Op.or]: [
                { username },
                { email }
            ]
        } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: "Erreur d'authentification" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Connexion établie', token });
    } catch (error) {

        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});


router.get('/', verifyToken, async (req, res) => {
    res.json({ message: 'postes protégés' });
});

module.exports = router;