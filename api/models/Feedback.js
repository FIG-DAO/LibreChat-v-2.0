const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  user: String,
  sessionId: String,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
