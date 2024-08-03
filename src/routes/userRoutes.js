const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidationRules } = require('../validators/userValidator');
const { validate } = require('../validators');
const registerLimiter = require('../middlewere/rateLimiter');

router.get('/', userController.getAll);
router.post('/', registerLimiter, registerValidationRules(), validate, userController.register);
router.put('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

module.exports = router;