const crypto = require('crypto'); 
const nodemailer = require("nodemailer");
const router = require('express').Router();
const User = require('../models/user');

router.post('/user/send-email', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 1800000; // Token expire dans 30 minutes

    // Enregistrer le token dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Envoyer l'e-mail de réinitialisation
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'MiamMiamContact7@gmail.com',
                pass: 'nkif bnst ufaz sneg'
            }
        });
    
        await transporter.sendMail({
            from: 'MiamMiamContact7@gmail.com',
            to: email,
            subject: "Modification du mot de passe",
            html: `<p>Vous trouverez ci-joint un lien vous permettant de modifier votre mot de passe :</p><a href='http://localhost:5173/newmdp'>Modifier votre mot de passe</a>`,
        });
        res.send('Password reset link has been sent to your email address');
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        res.status(500).send("Erreur lors de l'envoi de l'e-mail");
    }
});

module.exports = router;
