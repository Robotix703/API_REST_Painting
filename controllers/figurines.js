const Figurine = require('./../models/figurine');

const protocol = (process.env.NODE_ENV === "production") ? "https" : "http";

exports.writeFigurine = (req, res) => {

  const url = protocol + '://' + req.get("host");

  const figurine = new Figurine({
    name: req.body.name,
    categorie: req.body.categorie,
    imagePath: url + "/images/" + req.file.filename
  });

  figurine.save()
    .then(result => {
      res.status(201).json({ id: result._id, figurine });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getFigurines = (req, res) => {

  const pageSize = parseInt(req.query.pageSize);
  const currentPage = parseInt(req.query.currentPage) + 1;

  const figurineQuery = Figurine.find();
  let fetchedFigurines;

  if (pageSize && currentPage) {
    figurineQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  figurineQuery
    .then(documents => {
      fetchedFigurines = documents;
      return Figurine.count();
    })
    .then(count => {
      res.status(200).json({ figurines: fetchedFigurines, maxFigurines: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getFigurine = (req, res) => {

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

exports.updateFigurine = (req, res) => {

  let imagePath = req.body.imagePath;

  //Vérification présence image
  if (req.file) {
    const url = protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }

  const figurine = new Figurine({
    _id: req.params.id,
    name: req.body.name,
    categorie: req.body.categorie,
    imagePath: imagePath
  });

  Figurine.updateOne({ _id: req.params.id }, figurine)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(figurine);
      } else {
        res.status(401).json({ message: "Pas d'autorisation" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.deleteFigurine = (req, res) => {

  Figurine.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getCategoryList = (req, res) => {

  Figurine.find().distinct('categorie', function(error, categories) {
    res.status(200).send(categories);
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  });
}

exports.getCategoryFigurines = (req, res) => {

  Figurine.find({"categorie": req.query.category})
  .then(figurine => {
    if (figurine) {
      res.status(200).json(figurine);
    } else {
      res.status(404).json({ message: "Mauvais ID" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  });
}