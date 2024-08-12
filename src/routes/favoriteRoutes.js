const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.post('/add', favoriteController.add);
router.get('/movies', favoriteController.movies);
router.get('/series', favoriteController.series);

module.exports = router;