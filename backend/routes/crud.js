const express = require('express')
const router = express.Router()

const CrudController = require('../controllers/CrudController')


router.post('/addEvent', CrudController.addEvent)
router.get('/getEvents', CrudController.getEvents)
//router.get('/getEventsByMonth/:month', CrudController.getEvents)
router.get('/getEventById/:id', CrudController.getEventById)
router.put('/updateEvent/:id', CrudController.updateEvent)
router.get('/deleteEvent/:id', CrudController.deleteEvent)

module.exports = router 