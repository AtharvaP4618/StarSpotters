// SkyMap.jsx
import React from 'react';

const SkyMap = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Interactive Sky Map</h1>
        <p className="text-gray-300 text-center mb-12">
          Explore constellations, planets, and celestial objects in real-time.
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700">
          <div className="bg-slate-700 h-96 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Sky Map Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyMap;
