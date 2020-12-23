const Instruction = require('./../models/instruction');

//Récupération des instructions
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

exports.writeInstruction = (req, res, next) => {

  //Construction d'une instruction
  const instruction = new Instruction({
    name: req.body.name,
    content: req.body.content,
    paintID: "teststs",
    figurineID: req.body.figurineID
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
