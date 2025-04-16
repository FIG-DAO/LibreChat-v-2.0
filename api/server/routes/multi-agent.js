const express = require('express');
const router = express.Router();

const agents = [
  { id: 'leo-core', name: 'Leo Core' },
  { id: 'emma', name: 'Emma Assistant' },
  { id: 'observer', name: 'Observer' }
];

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  const responses = await Promise.all(
    agents.map(async (agent) => {
      // Здесь можешь вставить логику вызова реального AI-агента
      return {
        agent: agent.name,
        reply: `💬 [${agent.name}] получил: "${prompt}" — [ответ сгенерирован MVP-логикой]`
      };
    })
  );

  res.json({ responses });
});

module.exports = router;
