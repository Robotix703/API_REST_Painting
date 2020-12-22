const Instruction = require('./../models/instruction');

//Récupération des instructions
exports.getInstructions = (req, res, next) => {

  //Récupération des éléments de pagination
  const figurineID = req.query.figurineID;

  //Query
  const instructionQuery = Instruction.find({'figurineID': figurineID});

  let fetchedInstructions;

  //Récupérations de données
  instructionQuery
    .then(documents => {
      fetchedInstructions = documents;
      return Instruction.count();
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
