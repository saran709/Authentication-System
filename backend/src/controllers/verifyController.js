const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Token = require('../models/Token');
const sendEmail = require('../utils/email');

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If the email exists you will receive reset instructions' });

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await Token.create({ user: user._id, token, type: 'passwordReset', expiresAt });
    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;
    const html = `<p>Hi ${user.name || ''},</p><p>Reset your password: <a href="${link}">Reset password</a></p>`;
    await sendEmail({ to: user.email, subject: 'Password reset', html, text: `Reset: ${link}` });
    res.json({ message: 'If the email exists you will receive reset instructions' });
  } catch (err) { next(err); }
}

async function resetPassword(req, res, next) {
  try {
    const { token, id, password } = req.body;
    if (!token || !id || !password) return res.status(400).json({ error: 'Missing parameters' });
    const record = await Token.findOne({ token, user: id, type: 'passwordReset', used: false });
    if (!record || record.expiresAt < new Date()) return res.status(400).json({ error: 'Invalid or expired token' });
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: 'Invalid user' });
    user.password = await bcrypt.hash(password, 12);
    await user.save();
    record.used = true;
    await record.save();
    res.json({ message: 'Password reset successfully' });
  } catch (err) { next(err); }
}

async function verifyEmail(req, res, next) {
  try {
    const { token, id } = req.query;
    if (!token || !id) return res.status(400).json({ error: 'Missing parameters' });
    const record = await Token.findOne({ token, user: id, type: 'emailVerify', used: false });
    if (!record || record.expiresAt < new Date()) return res.status(400).json({ error: 'Invalid or expired token' });
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: 'Invalid user' });
    user.isVerified = true;
    await user.save();
    record.used = true;
    await record.save();
    // redirect to client verify page
    return res.redirect(`${process.env.CLIENT_URL}/verify-email-success`);
  } catch (err) { next(err); }
}

module.exports = { forgotPassword, resetPassword, verifyEmail };
