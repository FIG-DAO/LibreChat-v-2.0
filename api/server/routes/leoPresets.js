const express = require('express');
const router = express.Router();
const LeoPreset = require('../models/LeoPreset');

// GET all
router.get('/', async (_req, res) => {
  try {
    const presets = await LeoPreset.find().sort({ createdAt: -1 });
    res.json(presets);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения LeoPreset' });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const preset = new LeoPreset(req.body);
    await preset.save();
    res.status(201).json({ status: 'created', preset });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания LeoPreset' });
  }
});

module.exports = router;
