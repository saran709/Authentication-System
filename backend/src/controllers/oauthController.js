const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { signAccessToken, signRefreshToken } = require('../utils/jwt');

async function oauthHandler(req, res, next) {
  try {
    const provider = req.params.provider;
    const { providerId, email, name, avatar } = req.body;
    if (!provider || !providerId) return res.status(400).json({ error: 'Missing provider data' });

    // try find by providerId
    let user = await User.findOne({ 'oauthProviders.provider': provider, 'oauthProviders.providerId': providerId });

    if (!user && email) {
      // try find by email to link
      user = await User.findOne({ email });
      if (user) {
        // link provider
        user.oauthProviders = user.oauthProviders || [];
        user.oauthProviders.push({ provider, providerId });
        user.avatar = user.avatar || avatar;
        user.isVerified = true;
        await user.save();
      }
    }

    if (!user) {
      // create new user
      user = await User.create({ email, name, avatar, isVerified: true, oauthProviders: [{ provider, providerId }], roles: ['User'] });
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    await RefreshToken.create({ token: refreshToken, user: user._id });

    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
    res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, roles: user.roles } });
  } catch (err) { next(err); }
}

module.exports = { oauthHandler };
