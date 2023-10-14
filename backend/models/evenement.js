const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Définir le schéma pour l'utilisateur
const eventSchema = new Schema({
    title: {
        type : String,
         
    },
    chef: {
      type: String,
       
    },
    date: {
      type: String,
       
    },
    heure : {
        type : String
    },
    mois : {
        type : String,
    },
    lieu: {
      type: String,
       
    },
    description : {
        type : String, 
         

    }
  });

  const Event = mongoose.model('Event',eventSchema)
  module.exports = Event