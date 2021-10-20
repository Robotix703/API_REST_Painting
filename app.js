const express = require('express');
const bodyParser = require("body-parser");
const BDD = require('./BDD');
const path = require('path')

//Ajout des routes
const figurinesRoutes = require('./routes/figurines');
const userRoutes = require("./routes/user");
const paintRoutes = require("./routes/paint");
const colorRoutes = require("./routes/color");

//Création de l'application
const app = express();

//Initialisation de body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Autorisation accès dossiers
app.use("/images", express.static(path.join("images")));    //Images

//gestion du comflit CORS
app.use((req, res, next) => {

    //Mise en place des headers
    res.setHeader('Access-Control-Allow-Origin', "*");

    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS, PUT");

    //Libération de la requête
    next();
});

//Utilisation de la route Figurines
app.use("/api/figurines", figurinesRoutes);

//Utilisation de la route Posts
app.use("/api/user", userRoutes);

//Utilisation de la route Instructions
app.use("/api/paint", paintRoutes);

//Utilisation de la route Color
app.use("/api/color", colorRoutes);

//Export de l'application
module.exports = app;
