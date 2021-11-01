const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const FigurinesController = require("../controllers/figurines");

const router = express.Router();

router.get('/', FigurinesController.getFigurines);
router.get('/:id', FigurinesController.getFigurine);

router.put("/:id", checkAuth, extractFile, FigurinesController.updateFigurine);

router.post('', checkAuth, extractFile, FigurinesController.writeFigurine);

router.delete("/:id", checkAuth, FigurinesController.deleteFigurine);

module.exports = router;
