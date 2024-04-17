const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware');

router.put('/user/:userId', verifyToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user.id;
        const userids = parseInt(req.params.userId);
        console.log(userId);
        if (userId !== parseInt(userids)) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier cet utilisateur' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ error: 'Nom d\'utilisateur déjà utilisé' });
            }
        }

        await User.update(
            { username, email },
            { where: { id: userId } }
        );

        
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ message: 'Compte mis à jour avec succès', token }); 
    } catch (error) {
    
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

module.exports = router;

