const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user')

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

module.exports = router;