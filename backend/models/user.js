const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Définir le schéma pour l'utilisateur
const userSchema = new Schema({
    username: {
        type : String,
        required : false,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['membre' , 'participant', 'admin'], 
      default : "admin"
    }
  });

  const User = mongoose.model('User',userSchema)
  module.exports = User