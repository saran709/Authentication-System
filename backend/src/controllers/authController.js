const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const Token = require('../models/Token');
const { signAccessToken, signRefreshToken, verifyRefresh } = require('../utils/jwt');
const sendEmail = require('../utils/email');

async function register(req, res, next) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User exists' });
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hash, name });
    // create email verification token and send email
    try {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
      await Token.create({ user: user._id, token, type: 'emailVerify', expiresAt });
      const link = `${process.env.CLIENT_URL}/verify-email?token=${token}&id=${user._id}`;
      const html = `<p>Hi ${user.name || ''},</p><p>Please verify your email by clicking <a href="${link}">here</a>.</p>`;
      await sendEmail({ to: user.email, subject: 'Verify your email', html, text: `Verify: ${link}` });
    } catch (e) { console.error('Email send failed', e); }
    res.status(201).json({ message: 'Registered', user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    if (!user.password) return res.status(400).json({ error: 'No local password set' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    const rt = await RefreshToken.create({ token: refreshToken, user: user._id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) });

    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });

    user.lastLogin = new Date();
    await user.save();

    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, roles: user.roles } });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });
    const stored = await RefreshToken.findOne({ token });
    if (!stored || stored.revoked) return res.status(401).json({ error: 'Invalid refresh token' });
    try {
      const payload = verifyRefresh(token);
      // rotate
      stored.revoked = true;
      const newRefresh = signRefreshToken(payload.sub);
      stored.replacedBy = newRefresh;
      await stored.save();
      await RefreshToken.create({ token: newRefresh, user: payload.sub });
      const accessToken = signAccessToken(payload.sub);
      res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax' });
      res.cookie('refreshToken', newRefresh, { httpOnly: true, sameSite: 'lax' });
      res.json({ accessToken, refreshToken: newRefresh });
    } catch (err) {
      return res.status(401).json({ error: 'Expired or invalid refresh token' });
    }
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (token) {
      await RefreshToken.findOneAndUpdate({ token }, { revoked: true });
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout };
