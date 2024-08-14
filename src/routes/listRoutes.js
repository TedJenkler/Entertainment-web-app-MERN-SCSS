const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/details', listController.details);
router.post('/add', listController.add);
router.post('/add/movie', listController.movie);
router.post('/remove/movie', listController.removemovie);
router.post('/clear', listController.clear);
router.delete('/delete', listController.delete);

module.exports = router;