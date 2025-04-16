const mongoose = require('mongoose');

const PresetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  systemMessage: String,
  model: String,
  folder: String,
  promptPrefix: String,
  temperature: Number,
  tools: [mongoose.Schema.Types.Mixed],
  chatGptLabel: String,
  modelLabel: String,
  endpoint: String,
  user: String,
  presetId: String,
  defaultPreset: Boolean,
  order: Number,
}, { timestamps: true });

module.exports = mongoose.model('Preset', PresetSchema);
