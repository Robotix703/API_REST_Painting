const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

//Ajout controllers
const PostsController = require("../controllers/posts");

//Démarrage router
const router = express.Router();

//Gestion des écriture de posts
router.post('', checkAuth, extractFile, PostsController.writePost);

//Gestion de la récupération des posts
router.get('', PostsController.getPosts);

router.get('/:id', PostsController.getPost);

router.put("/:id", checkAuth, extractFile, PostsController.updatePost)

//Gestion de la suppression des posts
router.delete("/:id", checkAuth, PostsController.deletePost);

module.exports = router;