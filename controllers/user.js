const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Ajout du model
const User = require("../models/user");

//Création d'un utilisateur
exports.createUser = (req, res, next) => {
  //Hash
  bcrypt.hash(req.body.password, 10).then(hash => {
    //Utilisateur
    const user = new User({
      email: req.body.email,
      password: hash
    });

    //Sauvegarde dans la BDD
    user.save()
      .then(result => {
        //Renvoi de l'information
        res.status(201).json({
          result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });
};

//Connexion
exports.userLogin = (req, res, next) => {
  //Partage infos user
  let fetchUser;

  //Vérification existance email
  User.findOne({ email: req.body.email })
    .then(user => {
      fetchUser = user;

      //Email inconnu
      if (!user) {
        return res.status(401).json({
          message: "Mauvaise Email"
        });
      }

      //Vérification du mot de passe
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      //Mauvais mot de passe
      if (!result) {
        return res.status(401).json({
          message: "Mauvaise Mot de passe"
        });
      }

      //Nouveau token
      const token = jwt.sign(
        {
          email: fetchUser.email,
          userId: fetchUser._id
        },
        process.env.JWT,
        { expiresIn: "1h" }
      );

      //Envoi de la réponse
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Erreur"
      });
    });
};
