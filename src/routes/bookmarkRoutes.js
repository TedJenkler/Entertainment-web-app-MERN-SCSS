const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.post('/add', bookmarkController.add);
router.get('/movies', bookmarkController.movies);
router.get('/series', bookmarkController.series);

module.exports = router