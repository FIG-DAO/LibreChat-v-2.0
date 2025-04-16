const mongoose = require('mongoose');

const LeoPresetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  systemMessage: String,
  model: { type: String, default: 'gpt-4' },
  temperature: { type: Number, default: 0.7 },
  tools: [mongoose.Schema.Types.Mixed],
  promptPrefix: String,
  leoOnly: { type: Boolean, default: true },
  tags: [String],
  createdBy: String,
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('LeoPreset', LeoPresetSchema);
