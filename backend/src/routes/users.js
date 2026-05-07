const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { me, updateProfile } = require('../controllers/userController');

router.get('/me', authenticate, me);
router.put('/me', authenticate, updateProfile);

module.exports = router;
