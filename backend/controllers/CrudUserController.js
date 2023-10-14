const User = require('../models/user');



// Ajouter un événement
const addUser = async (req, res, next) => {
    console.log('data', req.body)
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des utilisateurs
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un utilisateur par son ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('user not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un événement
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) throw new Error('user not found');
    res.status(200).json({ message: 'user updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un événement
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error('user not found');
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
