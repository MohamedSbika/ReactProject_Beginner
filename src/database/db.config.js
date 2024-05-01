const config = require('../config/config');
const mongoose = require('mongoose');

const db = {};
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
db.mongoose = mongoose;
db.url = config.DB_URL;
db.posts = require('../api/models/post.model')(mongoose); // Modèle existant

// Importez et ajoutez les nouveaux modèles ici
db.taches = require('../api/models/tache.model')(mongoose);
db.projets = require('../api/models/projet.model')(mongoose);

module.exports = db;
