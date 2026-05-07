const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: { type: String, required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date },
  revoked: { type: Boolean, default: false },
  replacedBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
