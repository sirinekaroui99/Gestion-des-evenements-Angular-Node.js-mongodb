const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Définir le schéma pour l'actualite
const actualiteSchema = new Schema({
    nom: {
        type : String,
         
    },
    description: {
      type: String,
       
    },
    date: {
      type: String,
       
    },
    image : {
        type : String
    },
    mois : {
        type : String,
    },
    
    
  });

  const Actualite = mongoose.model('Actualite',actualiteSchema)
  module.exports = Actualite