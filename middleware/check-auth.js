const jwt = require("jsonwebtoken");

//Middleware
module.exports = (req, res, next) => {
    try{
        //Récupération du token
        const token = req.headers.authorization.split(" ")[1];

        //Vérification des erreurs
        const decodedToken =  jwt.verify(token, 'secret');
        //Ajout de ces informations à la requête
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };

        //Tout s'est bien passé
        next();
    } catch (error) {
        //Gestion de l'erreur
        res.status(401).json("Erreur de connexion");
    }
};