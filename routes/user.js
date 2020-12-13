const express = require("express");

//Ajout dossier controller
const UserController = require("../controllers/user");

//Démarrage router
const router = express.Router();

//Création d'un nouvel utilisateur
router.post("/signup", UserController.createUser);

//Gestion de la connexion
router.post("/login", UserController.userLogin);

module.exports = router;