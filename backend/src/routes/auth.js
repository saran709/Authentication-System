const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/authController');
const { forgotPassword, resetPassword, verifyEmail } = require('../controllers/verifyController');
const { oauthHandler } = require('../controllers/oauthController');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);
router.post('/oauth/:provider', oauthHandler);

module.exports = router;
