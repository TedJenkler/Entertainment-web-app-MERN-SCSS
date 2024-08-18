const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidationRules } = require('../validators/userValidator');
const { validate } = require('../validators');
const registerLimiter = require('../middlewere/rateLimiter');
const fetchListTMDB = require('../middlewere/fetchListsTMDB');

// TMDB

router.get('/token', userController.getToken);
router.post('/tmdb/login', userController.tmdbLogin, fetchListTMDB, userController.processFetchedLists);
router.delete('/tmdblogout', userController.tmdblogout);

router.get('/', userController.getAll);
router.get('/username', userController.getByUsername)
router.post('/', registerLimiter, registerValidationRules(), validate, userController.register);
router.post('/login', userController.login);
router.put('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

module.exports = router;