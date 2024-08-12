const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/add', listController.add);
router.post('/add/movie', listController.movie);

module.exports = router;