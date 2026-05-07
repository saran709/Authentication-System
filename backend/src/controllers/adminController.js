const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');

async function listUsers(req, res, next) {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const filter = {};
    if (q) filter.$or = [{ email: new RegExp(q, 'i') }, { name: new RegExp(q, 'i') }];
    const users = await User.find(filter).skip((page - 1) * limit).limit(parseInt(limit));
    const total = await User.countDocuments(filter);
    res.json({ users, total });
  } catch (err) {
    next(err);
  }
}

async function updateRole(req, res, next) {
  try {
    const { id } = req.params;
    const { roles } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.roles = roles;
    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function getStats(req, res, next) {
  try {
    const totalUsers = await User.countDocuments();
    const activeSessions = await User.countDocuments({ lastLogin: { $gt: new Date(Date.now() - 24 * 3600 * 1000) } });
    const recentLogins = await User.find({}).sort({ lastLogin: -1 }).limit(5);
    res.json({ totalUsers, activeSessions, recentLogins });
  } catch (err) { next(err); }
}

module.exports = { listUsers, updateRole, getStats };
