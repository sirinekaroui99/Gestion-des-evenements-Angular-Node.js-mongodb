// Importer les modules nécessaires
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const AuthRoute = require('./routes/auth')
const CrudRoute = require('./routes/crud')
const CrudUserRoute = require('./routes/crudUser')
const AuthRouteGoogle = require('./routes/authGoogle')
const CrudRouteGoogle = require('./routes/crudGoogle') 
const MailRoute = require('./routes/mail')

// Créer une instance de l'application Express.js
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecter à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.listen(3000 , () =>{
  console.log('app listen on port 3000')
})

app.use(cors());

 
app.use('/authapi', AuthRoute)
app.use('/crud', CrudRoute)
app.use('/cruduser', CrudUserRoute)
app.use('/auth', AuthRouteGoogle)
app.use('/crudgoogle', CrudRouteGoogle) 
app.use('/mail',MailRoute)