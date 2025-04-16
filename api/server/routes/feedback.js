const express = require('express');
const router = express.Router();

const feedbacks = []; // MVP in-memory, потом Mongo

router.post('/', (req, res) => {
  const { message } = req.body;
  feedbacks.push({ message, date: new Date().toISOString() });
  res.status(201).json({ status: 'received' });
});

router.get('/', (req, res) => {
  res.json(feedbacks);
});

module.exports = router;
