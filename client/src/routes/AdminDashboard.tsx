import React from 'react';
import FeedbackDashboard from '../components/feedback/FeedbackDashboard';
import MCPObserver from '../components/observer/MCPObserver';

const AdminDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">🔧 Панель администратора</h1>
      <div className="grid gap-6">
        <FeedbackDashboard />
        <MCPObserver />
      </div>
    </div>
  );
};

export default AdminDashboard;
