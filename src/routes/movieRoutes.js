const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/toprated', movieController.toprated);
router.get('/nowplaying', movieController.nowplaying);
router.get('/popular', movieController.popular);
router.post('/addMany', movieController.addMany);

module.exports = router