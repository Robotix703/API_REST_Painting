const Color = require('./../models/color');

//Ecriture d'une couleur
exports.writeColor = (req, res, next) => {

  //Construction d'une couleur
  const color = new Color({
    name: req.body.name,
    gamme: req.body.gamme
  });

  //Sauvegarde dans la BDD
  color.save()
    .then(result => {
      //Renvoi d'une réponse
      res.status(201).json({ id: result._id, color });
    })
    .catch(error => {
      res.status(500).json({
        message: "La création à échoué"
      })
    });
}

//Récupération des couleurs
exports.getColors = (req, res, next) => {

  let fetchedColors;

  //Récupération de tout les éléments
  const colorQuery = Color.find();

  //Récupérations de données
  colorQuery
    .then(documents => {
      fetchedColors = [...documents];
      return documents.length;
    })
    .then(count => {
      //Réponse
      res.status(200).json({ Colors: fetchedColors, maxColors: count });
    })
    .catch(error => {
      res.status(500).json({
        message: "La récupération à échoué"
      })
    });
};

//Suppression d'une couleur
exports.deleteColor = (req, res, next) => {

  //Demande à la BDD
  Color.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "La suppression à échoué"
      })
    });
};
