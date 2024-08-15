const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/toprated', movieController.toprated);
router.get('/nowplaying', movieController.nowplaying);
router.get('/popular', movieController.popular);
router.get('/upcoming', movieController.upcoming);
router.get('/trending', movieController.trending);
router.post('/addMany', movieController.addMany);

// rating

router.post('/rating', movieController.rating);
router.post('/rating/add', movieController.addrating);
router.delete('/rating/delete', movieController.deleterating);

module.exports = router