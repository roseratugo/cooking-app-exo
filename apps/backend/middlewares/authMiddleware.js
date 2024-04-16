const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send("Un token est requis pour l'authentification");
}
const token = authHeader.split(' ')[1];


try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch (error) {
  console.error("Erreur de vérification du token: ", error.message);
}
};

module.exports = { verifyToken };
