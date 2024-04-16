const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')
const { verifyToken } = require('../middlewares/authMiddleware');



router.get('/', verifyToken, async (req, res) => {
    res.json({ message: 'postes protégés' });
});

module.exports = router;
