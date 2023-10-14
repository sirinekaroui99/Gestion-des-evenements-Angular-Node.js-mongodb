const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthGoogleController')

router.get('/', AuthController.login)
router.get('/callback', AuthController.redirected)
module.exports = router 