const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const userSchema = require('../models/User/user.validation.schema');
const validateRequestSchema = require('../middlewares/validation.middlware');
// const errorHandler = require('../../middleware/error/errorHandler.middleware');

// TODO : role middleware
router.get('/', userController.getAll);
router.post('/', userSchema.createUserSchema, validateRequestSchema, userController.create);
router.get('/:id', userController.getOne);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
