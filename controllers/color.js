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
