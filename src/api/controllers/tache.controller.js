const Tache = require('../models/tache.model');

// Créer une tâche
exports.create = async (req, res) => {
  try {
    const { nom, description, dateDebut, dateFin, statut, projet } = req.body;
    const nouvelleTache = new Tache({ nom, description, dateDebut, dateFin, statut, projet });
    const tacheEnregistree = await nouvelleTache.save();
    res.status(201).json(tacheEnregistree);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche.' });
  }
};

// Obtenir toutes les tâches
exports.findAll = async (req, res) => {
  try {
    const taches = await Tache.find();
    res.status(200).json(taches);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
};

// Supprimer une tâche
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Tache.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.' });
  }
};

// Obtenir une tâche par son ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const tache = await Tache.findById(id);
    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    res.status(200).json(tache);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche.' });
  }
};

// Mettre à jour une tâche
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nom, description, dateDebut, dateFin, statut, projet } = req.body;
    const tache = await Tache.findByIdAndUpdate(id, { nom, description, dateDebut, dateFin, statut, projet }, { new: true });
    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    res.status(200).json(tache);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.' });
  }
};
