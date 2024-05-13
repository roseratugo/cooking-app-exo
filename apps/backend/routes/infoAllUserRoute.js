const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/users/usernames', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['username','email']  
        });
        const usernames = users.map(user => ({
            username: user.username,
            email: user.email
        }));
        res.json(usernames);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



module.exports = router;
