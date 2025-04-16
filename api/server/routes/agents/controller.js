const Preset = require('../models/Preset');

const getLeoAgents = async (_req, res) => {
  try {
    const agents = await Preset.find({ folder: 'Leo Team' }).sort({ name: 1 });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка получения агентов' });
  }
};

const createLeoAgent = async (req, res) => {
  try {
    const preset = new Preset({ ...req.body, folder: 'Leo Team' });
    await preset.save();
    res.status(201).json({ status: 'created', preset });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания агента' });
  }
};

module.exports = {
  getLeoAgents,
  createLeoAgent,
};
