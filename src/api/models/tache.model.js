const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const TacheSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: { type: String, enum: ['En cours', 'Terminée', 'En attente'], default: 'En attente' },
}, {
    timestamps: true
});

TacheSchema.pre('save', function(next) {
    this.slug = slugify(this.nom, '_');
    next();
});

TacheSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Tache = mongoose.model('Tache', TacheSchema);

module.exports = Tache;
