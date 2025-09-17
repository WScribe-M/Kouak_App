const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    console.log("➡️ authMiddleware exécuté"); 
  const authHeader = req.headers["authorization"];

  // Vérifie si le header existe et commence par "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // on ajoute les infos du token dans req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};
