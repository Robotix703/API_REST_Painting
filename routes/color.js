const express = require("express");

const checkAuth = require("../middleware/check-auth");

//Ajout controllers
const ColorControllers = require("../controllers/color");

//Démarrage router
const router = express.Router();

//Gestion de la récupération des couleurs
router.get('/', ColorControllers.getColors);

//Gestion de l'écriture d'une instruction
router.post('/', checkAuth, ColorControllers.writeColor);

module.exports = router;
