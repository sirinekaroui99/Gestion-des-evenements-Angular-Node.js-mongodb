const Event = require('../models/evenement');



// Ajouter un événement
const addEvent = async (req, res, next) => {
    console.log('data', req.body)
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des événements
const getEvents = async (req, res, next) => {
  console.log('test get events')
   
    const events = await Event.find();
    events.forEach(obj => {
      console.log('objeeeeet',obj)
        const date = obj.date;
        console.log("date",date);
        const dateParts = date.split('/');
    const isoDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
    console.log('isoDate',isoDate)
    obj.date = isoDate
      });
    
    res.status(200).json(events);
   
};

// Obtenir un événement par son ID
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) throw new Error('Event not found');
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un événement
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body);
    if (!event) throw new Error('Event not found');
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un événement
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) throw new Error('Event not found');
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
