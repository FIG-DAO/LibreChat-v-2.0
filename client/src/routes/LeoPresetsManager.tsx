import React, { useEffect, useState } from 'react';

const LeoPresetsManager = () => {
  const [presets, setPresets] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    systemMessage: '',
    model: 'gpt-4',
    temperature: 0.7,
  });

  const fetchPresets = async () => {
    const res = await fetch('/api/leo-presets');
    const data = await res.json();
    setPresets(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createPreset = async () => {
    await fetch('/api/leo-presets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({
      name: '',
      description: '',
      systemMessage: '',
      model: 'gpt-4',
      temperature: 0.7,
    });
    fetchPresets();
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Управление Leo-пресетами</h1>

      <div className="mb-6 grid gap-3">
        <input
          className="border p-2 rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Название агента"
        />
        <input
          className="border p-2 rounded"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
        />
        <textarea
          className="border p-2 rounded"
          name="systemMessage"
          value={form.systemMessage}
          onChange={handleChange}
          placeholder="System Prompt"
        />
        <input
          className="border p-2 rounded"
          type="number"
          name="temperature"
          step="0.1"
          min="0"
          max="1"
          value={form.temperature}
          onChange={handleChange}
        />
        <button
          onClick={createPreset}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Создать Leo-пресет
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-3">📄 Список пресетов</h2>
      <ul className="space-y-2">
        {presets.map((preset, i) => (
          <li key={i} className="border p-3 rounded bg-gray-100">
            <strong>{preset.name}</strong> — <em>{preset.description}</em>
            <pre className="text-xs mt-2 text-gray-700 whitespace-pre-wrap">
              {preset.systemMessage}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeoPresetsManager;
