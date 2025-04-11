// RecommendationsPage.jsx
import React from 'react';

export default function RecommendationsPage() {
    const spots = [
      {
        id: 1,
        name: "Blue Mountain Peak",
        score: 94,
        distance: "45km",
        conditions: "Clear skies, low humidity",
        nextBestTime: "Tonight 10:15 PM"
      },
      {
        id: 2,
        name: "Desert View Point",
        score: 88,
        distance: "120km",
        conditions: "Minimal light pollution",
        nextBestTime: "Tomorrow 2:30 AM"
      },
      {
        id: 3,
        name: "Lakeside Observatory",
        score: 82,
        distance: "80km",
        conditions: "Partial clouds, good visibility",
        nextBestTime: "Friday 11:45 PM"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Recommended Spots</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map(spot => (
              <div 
                key={spot.id}
                className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{spot.name}</h3>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {spot.score}% Match
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center">
                    <span className="mr-2">📍</span>
                    {spot.distance} from you
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">⛅</span>
                    {spot.conditions}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">⏰</span>
                    Best time: {spot.nextBestTime}
                  </p>
                </div>
                
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  