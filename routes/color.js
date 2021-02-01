const express = require("express");

const checkAuth = require("../middleware/check-auth");

//Ajout controllers
const ColorControllers = require("../controllers/color");

//Démarrage router
const router = express.Router();

//Gestion de la récupération des couleurs
router.get('/', ColorControllers.getColors);

//Gestion de la récupération des couleurs avec filtres
router.get('/filtre', ColorControllers.getColorsFiltre);

//Gestion de l'écriture d'une couleur
router.post('/', checkAuth, ColorControllers.writeColor);

//Gestion de la suppression des couleurs
router.delete("/:id", checkAuth, ColorControllers.deleteColor);

module.exports = router;
