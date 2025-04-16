import React, { useEffect, useState } from 'react';

const MCPObserver = () => {
  const [log, setLog] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/observer');
      const data = await res.json();
      setLog(data.logs);
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-4 border rounded mt-6 bg-gray-50">
      <h2 className="text-xl font-semibold">🧠 MCP Наблюдатель — Логи</h2>
      {log.map((entry, i) => (
        <div key={i} className="mt-2 p-2 bg-white shadow rounded">
          <p><strong>Пользователь:</strong> {entry.user}</p>
          <p><strong>Сессия:</strong> {entry.session}</p>
          <p><strong>Действие:</strong> {entry.action}</p>
          <p><strong>Время:</strong> {entry.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default MCPObserver;
