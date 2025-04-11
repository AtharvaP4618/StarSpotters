// Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">User Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">My Profile</h2>
            <div className="space-y-2 text-gray-300">
              <p>Username: Stargazer123</p>
              <p>Email: user@example.com</p>
              <p>Location: New Delhi, India</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-4">Recent Spots</h2>
            <div className="space-y-2 text-gray-300">
              <p>📍 Blue Mountain Peak - 94% Match</p>
              <p>📍 Desert View Point - 88% Match</p>
              <p>📍 Lakeside Observatory - 82% Match</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
