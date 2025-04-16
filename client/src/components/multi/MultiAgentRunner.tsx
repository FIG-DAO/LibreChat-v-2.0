import React, { useState } from 'react';

const MultiAgentRunner = () => {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/multi-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponses(data.responses);
    } catch (err) {
      console.error('Ошибка мультиагентов:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-3">🤖 Запуск Leo-команды</h2>

      <textarea
        className="w-full border p-3 rounded mb-4"
        rows={4}
        placeholder="Введите команду для Leo Team..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? 'Обработка...' : '🚀 Запустить'}
      </button>

      <div className="mt-6 space-y-4">
        {responses.map((r: any, i: number) => (
          <div
            key={i}
            className="border p-3 bg-gray-50 rounded shadow-sm"
          >
            <strong>{r.agent}</strong>:
            <p className="mt-2 text-gray-800 whitespace-pre-wrap">{r.reply}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiAgentRunner;
