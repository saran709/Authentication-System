const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    name: { type: String },
    avatar: { type: String },
    roles: [{ type: String, default: 'User' }],
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date },
    oauthProviders: [
      {
        provider: String,
        providerId: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
