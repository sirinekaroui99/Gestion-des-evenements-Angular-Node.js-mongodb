const express = require('express')
const router = express.Router()

const CrudGoogleController = require('../controllers/CrudGoogleController')


router.post('/addgoogleEvent', CrudGoogleController.addgoogleEvent)
router.get('/getgoogleEvents', CrudGoogleController.getgoogleEvents) 
router.delete('/deletegoogleEvent/:id', CrudGoogleController.deletegoogleEvent)

module.exports = router 