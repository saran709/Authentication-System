const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  action: String,
  meta: Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activitySchema);
