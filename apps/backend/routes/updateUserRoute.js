const express = require('express');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();
const bcrypt = require("bcrypt");

router.put('/updateMDP', verifyToken, async (req, res) => {
    try {

        console.log(req.body);
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.update({
            password: hashedPassword,
        }, {
            where: { id: req.user.id }

        });
     
        res.status(201).json(userId);
    } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
);


module.exports = router;
