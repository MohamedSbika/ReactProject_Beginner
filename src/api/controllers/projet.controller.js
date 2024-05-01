const Projet = require('../models/projet.model');
const mongoose = require('mongoose'); // Importez mongoose pour utiliser ses fonctionnalités


// Créer un projet
exports.create = async (req, res) => {
    try {
        const { nom, description, taches, produits } = req.body;
        const nouveauProjet = new Projet({ nom, description, taches, produits });
        const projetEnregistre = await nouveauProjet.save();
        res.status(201).json(projetEnregistre);
    } catch (error) {
        console.error('Erreur lors de la création du projet :', error);
        res.status(500).json({ message: 'Erreur lors de la création du projet.' });
    }
};

// Obtenir tous les projets
exports.findAll = async (req, res) => {
    try {
        const projets = await Projet.find().populate('taches produits');
        res.status(200).json(projets);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des projets.' });
    }
};

// Obtenir un projet par son ID
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const projet = await Projet.findById(id).populate('taches produits');
        if (!projet) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        res.status(200).json(projet);
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du projet.' });
    }
};

const { ObjectId } = require('mongoose').Types;

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, description, taches, produits } = req.body;

        // Vérifiez si taches et produits sont des tableaux
        if (!Array.isArray(taches) || !Array.isArray(produits)) {
            return res.status(400).json({ message: 'Le champ taches ou produits doit être un tableau.' });
        }

        // Convertir les chaînes de caractères en ObjectId pour les champs taches et produits
        const tachesObjectId = taches.map(tacheId => new ObjectId(tacheId));
        const produitsObjectId = produits.map(produitId => new ObjectId(produitId));

        // Mettre à jour le projet avec les valeurs converties
        const projetModifie = await Projet.findByIdAndUpdate(
            id,
            { nom, description, taches: tachesObjectId, produits: produitsObjectId },
            { new: true }
        ).populate('taches produits');
        
        if (!projetModifie) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }

        res.status(200).json(projetModifie);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du projet :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.' });
    }
};





// Supprimer un projet
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Projet.findByIdAndDelete(id);
        res.status(200).json({ message: 'Projet supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du projet.' });
    }
};
