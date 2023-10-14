const actualite = require('../models/evenement');



// Ajouter un événement
const addactualite = async (req, res, next) => {
    console.log('data', req.body)
  try {
    const actualite = new actualite(req.body);
    await actualite.save();
    res.status(201).json({ message: 'actualite added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des événements
const getactualites = async (req, res, next) => {
  try {
    const actualites = await actualite.find();
    actualites.forEach(obj => {
        const date = obj.date;
        console.log("date",date);
        const dateParts = date.split('/');
    const isoDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
    console.log('isoDate',isoDate)
    obj.date = isoDate
      });
    
    res.status(200).json(actualites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un événement par son ID
const getactualiteById = async (req, res, next) => {
  try {
    const actualite = await actualite.findById(req.params.id);
    if (!actualite) throw new Error('actualite not found');
    res.status(200).json(actualite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un événement
const updateactualite = async (req, res, next) => {
  try {
    const actualite = await actualite.findByIdAndUpdate(req.params.id, req.body);
    if (!actualite) throw new Error('actualite not found');
    res.status(200).json({ message: 'actualite updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un événement
const deleteactualite = async (req, res, next) => {
  try {
    const actualite = await actualite.findByIdAndDelete(req.params.id);
    if (!actualite) throw new Error('actualite not found');
    res.status(200).json({ message: 'actualite deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addactualite,
  getactualites,
  getactualiteById,
  updateactualite,
  deleteactualite,
};
