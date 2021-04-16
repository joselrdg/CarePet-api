const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const petsController = require('../controllers/pets.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// Users routes
// router.get('/', authMiddleware.isAuthenticated, usersController.user)
router.post('/users/create', usersController.create)
router.post('/users/auth', usersController.aunthenticate)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.get)

router.post('/pets/create/:user', petsController.create)
router.get('/pets/list', petsController.list)
router.get('/pets/:id', petsController.get)

module.exports = router;