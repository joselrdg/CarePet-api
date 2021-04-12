const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')

// Users routes
router.post('/users', usersController.create)

module.exports = router;