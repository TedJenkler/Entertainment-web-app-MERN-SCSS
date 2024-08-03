const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/toprated', movieController.toprated)

module.exports = router