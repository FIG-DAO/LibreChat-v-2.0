const express = require('express');
const router = express.Router();

const logs = []; // для MVP (в бою подключаем Mongo)

router.post('/log', (req, res) => {
  const { user, session, action } = req.body;
  logs.push({ user, session, action, timestamp: new Date().toISOString() });
  res.status(201).json({ status: 'ok' });
});

router.get('/', (req, res) => {
  res.json({ logs });
});

module.exports = router;
