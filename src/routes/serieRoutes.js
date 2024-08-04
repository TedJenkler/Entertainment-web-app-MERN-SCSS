const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');

router.post('/addMany', serieController.addMany);
router.get('/airingtoday', serieController.airingtoday);

module.exports = router;

