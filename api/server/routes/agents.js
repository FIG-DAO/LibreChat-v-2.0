const express = require('express');
const router = express.Router();
const Preset = require('../models/Preset');

// ✅ Получить всех агентов Leo Team
router.get('/', async (_req, res) => {
  try {
    const agents = await Preset.find({ folder: 'Leo Team' }).sort({ name: 1 });
    res.json(agents);
  } catch (err) {
    console.error('Ошибка получения агентов:', err);
    res.status(500).json({ error: 'Ошибка получения агентов' });
  }
});

// ✅ Создать нового агента
router.post('/', async (req, res) => {
  try {
    const preset = new Preset({ ...req.body, folder: 'Leo Team' });
    await preset.save();
    res.status(201).json({ status: 'created', preset });
  } catch (err) {
    console.error('Ошибка создания агента:', err);
    res.status(500).json({ error: 'Ошибка создания агента' });
  }
});

module.exports = router;
