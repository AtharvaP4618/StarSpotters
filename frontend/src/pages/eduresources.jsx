// EduResources.jsx
import React from 'react';

const EduResources = () => {
  const resources = [
    {
      id: 1,
      title: "Astrophotography Guide",
      description: "Learn how to capture stunning images of the night sky with our beginner's guide."
    },
    {
      id: 2,
      title: "Constellation Identification",
      description: "Interactive guide to recognizing major constellations and their mythology."
    },
    {
      id: 3,
      title: "Telescope Basics",
      description: "Everything you need to know about choosing and using your first telescope."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Educational Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div 
              key={resource.id}
              className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-300">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EduResources;
