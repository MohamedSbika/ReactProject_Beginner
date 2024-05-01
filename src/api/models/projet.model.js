const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    taches: [{ type: Schema.Types.ObjectId, ref: 'Tache' }],
    produits: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

module.exports = mongoose.model('Projet', projetSchema);
