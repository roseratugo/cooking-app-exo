const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const { verifyToken } = require('../middlewares/authMiddleware'); 

// Route pour obtenir les informations de l'utilisateur
router.get('/user', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: ['username', 'email']
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



module.exports = router;

