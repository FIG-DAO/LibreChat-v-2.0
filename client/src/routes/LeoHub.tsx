import React, { useState } from 'react';
import MultiAgentRunner from '../components/MultiAgentRunner';

const LeoHub = () => {
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);

  const handleLaunch = async () => {
    const res = await fetch('/api/multi-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: query }),
    });
    const data = await res.json();
    setResponses(data.responses);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Leo Core Hub</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите стратегический запрос..."
        className="w-full p-4 border rounded mb-4"
      />
      <button
        onClick={handleLaunch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🚀 Запустить Leo-команду
      </button>
      <div className="mt-6 space-y-4">
        {responses.map((r, i) => (
          <div key={i} className="p-3 border rounded bg-gray-100">
            <strong>{r.agent}</strong>: {r.reply}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeoHub;
