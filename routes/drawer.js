const express = require("express");
const checkAuth = require("../middleware/check-auth");

const DrawerControllers = require("../controllers/drawer");

const router = express.Router();

router.get('/', DrawerControllers.getDrawers);

router.get('/nom', DrawerControllers.getDrawerByName);

router.post('/', checkAuth, DrawerControllers.writeDrawer);

router.delete("/:id", checkAuth, DrawerControllers.deleteDrawer);

module.exports = router;
