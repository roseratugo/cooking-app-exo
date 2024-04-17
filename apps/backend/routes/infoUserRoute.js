const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const { verifyToken } = require('../middlewares/authMiddleware'); 

router.get('/user/:userId', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const userids = parseInt(req.params.userId);
        console.log(userId);
        if (userId !== parseInt(userids)) {
            return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier cet utilisateur' });
        }

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
