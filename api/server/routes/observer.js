const express = require('express');
const router = express.Router();
const MCPLog = require('../models/MCPLog'); // 👈 подключаем Mongo-модель

// POST: сохраняем лог
router.post('/log', async (req, res) => {
  try {
    const { user, session, action } = req.body;
    const log = new MCPLog({ user, session, action });
    await log.save();
    res.status(201).json({ status: 'ok' });
  } catch (err) {
    console.error('MCP log error:', err);
    res.status(500).json({ error: 'Failed to save log' });
  }
});

// GET: возвращаем список логов
router.get('/', async (_req, res) => {
  try {
    const logs = await MCPLog.find().sort({ timestamp: -1 }).limit(100);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router;
