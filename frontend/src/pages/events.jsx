import React from "react";

const Events = () => {
  const events = [
    {
      id: 1,
      name: "Total Lunar Eclipse",
      date: "April 14, 2025",
      description: "The Moon moves into Earth's shadow, creating a stunning red hue.",
    },
    {
      id: 2,
      name: "Perseid Meteor Shower",
      date: "August 12, 2025",
      description: "A spectacular meteor shower with up to 100 meteors per hour.",
    },
    {
      id: 3,
      name: "Saturn at Opposition",
      date: "July 20, 2025",
      description: "Saturn will be at its closest approach to Earth and fully illuminated by the Sun.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Upcoming Astronomical Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
              <p className="text-gray-400 mb-2">{event.date}</p>
              <p className="text-gray-300">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
