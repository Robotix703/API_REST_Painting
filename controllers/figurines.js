const Figurine = require('./../models/figurine');

//Récupération des figuines
exports.getFigurines = (req, res, next) => {

  //Récupération des éléments de pagination
  const pageSize = parseInt(req.query.pageSize);
  const currentPage = parseInt(req.query.currentPage);

  const figurineQuery = Figurine.find();

  let fetchedFigurines;

  //Vérifie la présence des éléments de pagination
  if (pageSize && currentPage) {
    //Ajout d'éléments dans la requête
    figurineQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  //Récupérations de données
  figurineQuery
    .then(documents => {
      fetchedFigurines = documents;
      return Figurine.count();
    })
    .then(count => {
      //Réponse
      res.status(200).json({ figurines: fetchedFigurines, maxFigurines: count });
    })
    .catch(error => {
      res.status(500).json({
        message: "La récupération à échoué"
      })
    });
};

//Récupération d'une figurine
exports.getFigurine = (req, res, next) => {
  //Recherche d'un élément particulier
  Figurine.findById(req.params.id)
    .then(figurine => {
      if (figurine) {
        res.status(200).json(figurine);
      } else {
        res.status(404).json({ message: "Mauvais ID" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "La récupération à échoué"
      })
    });
};

//Suppression d'une figurine
exports.deleteFigurine = (req, res, next) => {

  //Demande à la BDD
  Figurine.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
