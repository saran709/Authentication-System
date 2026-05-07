const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { permit } = require('../middleware/role');
const { listUsers, updateRole, getStats } = require('../controllers/adminController');

router.get('/stats', authenticate, permit('Super Admin','Admin'), getStats);
router.get('/users', authenticate, permit('Super Admin','Admin'), listUsers);
router.put('/users/:id/roles', authenticate, permit('Super Admin','Admin'), updateRole);

module.exports = router;
