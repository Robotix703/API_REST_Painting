const express = require("express");

const checkAuth = require("../middleware/check-auth");

//Ajout controllers
const PaintControllers = require("../controllers/paint");

//Démarrage router
const router = express.Router();

//Gestion de la récupération des instructions
router.get('/', PaintControllers.getInstructions);
//Gestion de la récuération d'une instruction en particulier
router.get('/:id', PaintControllers.getInstruction);

//Gestion de l'écriture d'une instruction
router.post('/', checkAuth, PaintControllers.writeInstruction);

//Gestion de la MAJ d'une instruction
router.put("/:id", checkAuth, PaintControllers.updateInstruction);

//Gestion de la suppression des instructions
router.delete("/:id", checkAuth, PaintControllers.deleteInstruction);

module.exports = router;
