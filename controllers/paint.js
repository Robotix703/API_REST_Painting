const Instruction = require('./../models/instruction');

//Récupération des instructions avec figurine ID
exports.getInstructions = (req, res, next) => {

  //Récupération des éléments de pagination
  const figurineID = req.query.figurineID;

  //Query
  const instructionQuery = Instruction.find({ 'figurineID': figurineID });

  let fetchedInstructions;

  //Récupérations de données
  instructionQuery
    .then(documents => {
      fetchedInstructions = [...documents];
      return documents.length;
    })
    .then(count => {
      //Réponse
      res.status(200).json({ Instructions: fetchedInstructions, maxInstructions: count });
    })
    .catch(error => {
      res.status(500).json({
        message: "La récupération à échoué"
      })
    });
};

//Récupération d'une instruction
exports.getInstruction = (req, res, next) => {
  //Recherche d'un élément particulier
  Instruction.findById(req.params.id)
    .then(instruction => {
      if (instruction) {
        res.status(200).json(instruction);
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

//MAJ d'une instruction
exports.updateInstruction = (req, res, next) => {

  const instruction = new Instruction({
    _id: req.params.id,
    name: req.body.name,
    content: req.body.content,
    figurineID: req.body.figurineID,
    paintID: req.body.paintID,
    step: req.body.step
  });

  //MAJ d'un élément avec Mangoose
  Instruction.updateOne({ _id: req.params.id }, instruction)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(instruction);
        return
      } else {
        res.status(401).json({ message: "Pas d'autorisation" });
        return
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "La Mise à jour à échoué"
      })
      return
    });
};

exports.writeInstruction = (req, res, next) => {

  //Construction d'une instruction
  const instruction = new Instruction({
    name: req.body.name,
    content: req.body.content,
    paintID: req.body.paintID,
    figurineID: req.body.figurineID,
    step: req.body.step
  });

  //Sauvegarde dans la BDD
  instruction.save()
    .then(result => {
      //Renvoi d'une réponse
      res.status(201).json({ id: result._id, instruction });
    })
    .catch(error => {
      res.status(500).json({
        message: "La création à échoué"
      })
    });
}

//Suppression d'une instruction
exports.deleteInstruction = (req, res, next) => {

  //Demande à la BDD
  Instruction.deleteOne({ _id: req.params.id })
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
