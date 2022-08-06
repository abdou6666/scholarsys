const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const Token = require('../services/Token.service');

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh_token', Token.refreshToken);
router.get('/confirm/:token', AuthController.confirmAccount);

router.post('/reset_password', AuthController.resetPassword);
router.post('/reset_password/:token', AuthController.changePassword);
// TODO: new end point for a user can ask for new confirmation account email
router.post('/send_confirmation_email');
module.exports = router;
