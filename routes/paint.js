const express = require("express");

const checkAuth = require("../middleware/check-auth");

//Ajout controllers
const PaintControllers = require("../controllers/paint");

//Démarrage router
const router = express.Router();

//Gestion de la récupération des instructions
router.get('/', PaintControllers.getInstructions);

//Gestion de l'écriture d'une instruction
router.post('/', PaintControllers.writeInstruction);

module.exports = router;
