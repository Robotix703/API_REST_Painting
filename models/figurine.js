const mongoose = require('mongoose');

const figurineSchema = mongoose.Schema({
    name: { type: String, required: true},
    categorie: { type: String, required: true },
    imagePath: { type: String, required: true}
});

module.exports = mongoose.model('Figurine', figurineSchema);
