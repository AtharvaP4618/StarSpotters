import React, { useState } from 'react';
// import MapComponent from '../components/map';
import MapComponent from '../components/MapComponent';

import allObjects from '../../../database/all_objects_catalog.json';


const SkyMap = () => {
  const [viewMode, setViewMode] = useState('night');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedObject, setSelectedObject] = useState(null);
  const data = allObjects;

  const filteredData = data.filter(obj => {
    const matchesQuery = searchQuery === '' || 
      obj.CommonName?.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (viewMode === 'night') return matchesQuery;
    if (viewMode === 'planets') return matchesQuery && obj.types?.includes('planet');
    if (viewMode === 'constellations') return matchesQuery && obj.types?.includes('constellation');
    return false;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Interactive Sky Map</h1>
        <p className="text-gray-300 text-center mb-6">
          Explore constellations, planets, and celestial objects in real-time.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for stars, planets, constellations..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg text-white ${viewMode === 'night' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
              onClick={() => setViewMode('night')}
            >
              Night Sky
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-white ${viewMode === 'planets' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
              onClick={() => setViewMode('planets')}
            >
              Planets
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-white ${viewMode === 'constellations' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
              onClick={() => setViewMode('constellations')}
            >
              Constellations
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700">
          {/* <MapComponent viewMode={viewMode} searchQuery={searchQuery} data={allObjects}/> */}
          <MapComponent viewMode={viewMode} filteredData={filteredData} setSelectedObject={setSelectedObject}/>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400">Current Time (UTC)</div>
              <div className="text-white">{new Date().toUTCString().slice(0, -4)}</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400">Visible Stars</div>
              <div className="text-white">2,539</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400">Moon Phase</div>
              <div className="text-white">Waxing Gibbous</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
              <div className="text-xs text-gray-400">Visible Planets</div>
              <div className="text-white">Venus, Mars, Jupiter, Saturn</div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>The sky map shows the celestial objects visible from your location. Click on any object to view details.</p>
          <p className="mt-2">Data is updated daily based on astronomical calculations.</p>
        </div>
      </div>
    </div>
  );
};

export default SkyMap;
