const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const router = require('express').Router();
const User = require('../models/user');
require('dotenv').config()

router.post('/user/send-email', async (req, res) => {
    const { email } = req.body;

    try {
        // Recherche de l'utilisateur par son adresse e-mail
        const user = await User.findOne({
            where: { email }
        });


        if (!user) {
            return res.status(404).send('User not found');
        }

        // Générer un token de réinitialisation
        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    
        await user.save();

        // Envoyer l'e-mail de réinitialisation
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "miamiam@corona-formation.fr",
                pass: "MiamMiam@72",
            },
        });

        await transporter.sendMail({
            from: 'miamiam@corona-formation.fr',
            to: email,
            subject: "Modification du mot de passe",
            html: `<p>Vous trouverez ci-joint un lien vous permettant de modifier votre mot de passe :</p><a href='http://localhost:5173/newmdp/${resetToken}'>Modifier votre mot de passe</a>`,
        });

        res.send('Password reset link has been sent to your email address');
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        res.status(500).send("Erreur lors de l'envoi de l'e-mail");
    }
});
module.exports = router;