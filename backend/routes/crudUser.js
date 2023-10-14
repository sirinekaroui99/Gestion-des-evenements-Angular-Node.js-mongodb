const express = require('express')
const router = express.Router()

const CrudUserController = require('../controllers/CrudUserController')


router.post('/addUser', CrudUserController.addUser)
router.get('/getUsers', CrudUserController.getUsers)
//router.get('/getEventsByMonth/:month', CrudUserController.getEvents)
router.get('/getUserById/:id', CrudUserController.getUserById)
router.put('/updateUser/:id', CrudUserController.updateUser)
router.get('/deleteUser/:id', CrudUserController.deleteUser)

module.exports = router 