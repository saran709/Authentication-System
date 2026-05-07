const User = require('../models/User');

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name } = req.body;
    const user = req.user;
    user.name = name ?? user.name;
    await user.save();
    res.json({ user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
}

module.exports = { me, updateProfile };
