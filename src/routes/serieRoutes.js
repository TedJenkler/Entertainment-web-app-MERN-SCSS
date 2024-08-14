const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');

router.post('/addMany', serieController.addMany);
router.get('/airingtoday', serieController.airingtoday);
router.get('/onair', serieController.onair);
router.get('/popular', serieController.popular);
router.get('/toprated', serieController.toprated);
router.get('/trending', serieController.trending);

// series

router.get('/rating', serieController.rating);
router.post('/rating/add', serieController.addrating);
router.delete('/rating/delete', serieController.deleterating);

module.exports = router;

