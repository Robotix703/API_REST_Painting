const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

//Ajout controllers
const FigurinesController = require("../controllers/figurines");

//Démarrage router
const router = express.Router();

//Gestion des écriture de posts
router.post('', checkAuth, extractFile, FigurinesController.writeFigurine);
//Gestion de la récupération des figurines
router.get('/', FigurinesController.getFigurines);
//Gestion de la récuération d'une figurine
router.get('/:id', FigurinesController.getFigurine);
//Gestion de la MAJ d'une figurine
router.put("/:id", checkAuth, extractFile, FigurinesController.updateFigurine);
//Gestion de la suppression des figurines
router.delete("/:id", checkAuth, FigurinesController.deleteFigurine);

module.exports = router;
