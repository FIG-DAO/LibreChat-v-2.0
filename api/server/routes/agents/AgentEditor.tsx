import React, { useState } from 'react';

const AgentEditor = () => {
  const [agent, setAgent] = useState({
    name: '',
    systemMessage: '',
    temperature: 0.7
  });

  const handleSave = async () => {
    await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent)
    });
    alert('✅ Агент сохранён');
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">✍️ Создать или изменить агента</h2>
      <input
        className="w-full border mb-3 p-2"
        placeholder="Имя"
        value={agent.name}
        onChange={(e) => setAgent({ ...agent, name: e.target.value })}
      />
      <textarea
        className="w-full border mb-3 p-2"
        placeholder="System Message"
        value={agent.systemMessage}
        onChange={(e) => setAgent({ ...agent, systemMessage: e.target.value })}
      />
      <input
        type="number"
        step="0.1"
        max={1}
        min={0}
        className="w-full border mb-3 p-2"
        placeholder="Температура"
        value={agent.temperature}
        onChange={(e) => setAgent({ ...agent, temperature: parseFloat(e.target.value) })}
      />
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
        Сохранить
      </button>
    </div>
  );
};

export default AgentEditor;
