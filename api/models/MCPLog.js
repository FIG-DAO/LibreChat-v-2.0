const mongoose = require('mongoose');

const MCPLogSchema = new mongoose.Schema({
  user: String,
  session: String,
  action: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MCPLog', MCPLogSchema);
