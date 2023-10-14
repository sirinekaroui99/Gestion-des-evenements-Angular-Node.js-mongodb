 
const { google } = require('googleapis');

// Ajouter un événement
const addgoogleEvent = async (req, res, next) => {
  console.log('event', req.body)
  const event = req.body
  const calendar = google.calendar({ version: 'v3' });
  calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return res.status(500).send('error');
    }
    console.log('Event created ');
    return res.status(200).send('success');
  });
};

// Obtenir la liste des événements
const getgoogleEvents = async (req, res, next) => {
  try {
    
    const calendar = google.calendar({ version: 'v3' });
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = data.items.map(event => {
      return {
        summary: event.summary,
        start: event.start,
        end: event.end,
        location : event.location,
        description : event.description,
        creator : event.creator,
        id : event.id
      };
    });
    console.log('Upcoming events:',  data.items);
    res.send(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.send('Error retrieving events!');
  }
};

 

 

// Supprimer un événement
const deletegoogleEvent = async (req, res, next) => {
  console.log('ressssssssssssssssssssss',req.params.id)
  const calendar = google.calendar({ version: 'v3' });
  const eventId = req.params.id; // Replace with the ID of the event you want to delete

  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    console.log('Event deleted');
    res.send('Event deleted');
  } catch (error) {
    console.error('Error deleting event:', error);
    res.send('Error deleting event');
  }
};

module.exports = {
  addgoogleEvent,
  getgoogleEvents, 
  deletegoogleEvent,
};
