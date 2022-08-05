const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();

const userController = require('../controllers/user.controller');
const userSchema = require('../models/User/user.validation.schema');
const validateRequestSchema = require('../middlewares/validation.middlware');
// const errorHandler = require('../../middleware/error/errorHandler.middleware');

// TODO : role middleware

router.use(fileUpload());
router.get('/teachers', userController.getTeachers);
router.get('/students', userController.getStudents);
router.get('/agents', userController.getAgents);
router.get('/', userController.getAll);
router.post(
	'/',
	userSchema.createUserSchema,
	validateRequestSchema,
	// fileUpload({
	// 	limits: { fileSize: 5 * 1024 * 1024 },
	// 	createParentPath: true,
	// 	// safeFileNames: true,
	// 	responseOnLimit: 'limited' //cloud cause error
	// }),
	userController.create
);
router.get('/:id', userController.getOne);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
