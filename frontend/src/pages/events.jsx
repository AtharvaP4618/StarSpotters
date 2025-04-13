// import React, { useState, useEffect } from "react";
// import { RotateSpinner } from "react-spinners-kit";
// import axios from "axios";

// const Events = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("2025");
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchEvents = async () => {
//     if (selectedMonth && selectedYear) {
//       try {
//         setLoading(true);
//         setError("");
//         const response = await axios.get("http://localhost:8000/api/events", {
//           params: {
//             month: selectedMonth,
//             year: selectedYear
//           }
//         });
//         if (response.status === 200) {
//           setEvents(response.data);
//         }
//       } catch (error) {
//         if (error.response) {
//           setError(error.response.data.detail);
//         } else {
//           setError("Cannot connect to server");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, [selectedMonth, selectedYear]);

//   const groupedEvents = events.reduce((acc, event) => {
//     if (!acc[event.date]) {
//       acc[event.date] = [];
//     }
//     acc[event.date].push(event);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-8 text-center">Upcoming Astronomical Events</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//           <div className="space-y-2">
//             <label className="text-gray-300">Select Month</label>
//             <select
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Choose a month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   {new Date(2025, i).toLocaleString("default", { month: "long" })}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-gray-300">Select Year</label>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="2024">2024</option>
//               <option value="2025">2025</option>
//               <option value="2026">2026</option>
//             </select>
//           </div>
//         </div>

//         {loading && (
//           <div className="flex justify-center py-12">
//             <RotateSpinner size={40} color="#3B82F6" />
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-center mb-8">
//             {error}
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Object.keys(groupedEvents).length > 0 ? (
//               Object.entries(groupedEvents).map(([date, eventsOnDate], idx) => (
//                 <div
//                   key={idx}
//                   className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all border border-slate-700"
//                 >
//                   <p className="text-blue-400 text-sm mb-2">📅 {date}</p>
//                   {eventsOnDate.map((event, i) => (
//                     <div key={i} className="mb-4">
//                       <p className="text-white font-semibold">🌠 {event.title}</p>
//                       <p className="text-gray-300 text-sm">📝 {event.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12 text-gray-400">
//                 Select a month and year to view events.
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;

import React, { useState, useEffect } from "react";
import { RotateSpinner } from "react-spinners-kit";
import axios from "axios";
import Calendar from "../components/calendar";

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewType, setViewType] = useState("calendar");

  const fetchEvents = async () => {
    if (selectedMonth && selectedYear) {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:8000/api/events", {
          params: {
            month: selectedMonth,
            year: selectedYear,
          },
        });
        if (response.status === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data.detail);
        } else {
          setError("Cannot connect to server");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedMonth, selectedYear]);

  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Upcoming Astronomical Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-gray-300">Select Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-300">Select Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2025, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-gray-300">View Type</label>
            <div className="flex bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
              <button
                onClick={() => setViewType("calendar")}
                className={`w-1/2 py-3 text-white ${
                  viewType === "calendar" ? "bg-blue-600" : "hover:bg-slate-700/50"
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`w-1/2 py-3 text-white ${
                  viewType === "list" ? "bg-blue-600" : "hover:bg-slate-700/50"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center py-12">
            <RotateSpinner size={40} color="#3B82F6" />
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-center mb-8">
            {error}
          </div>
        )}
        {!loading && !error && events.length > 0 && (
          <>
            {viewType === "calendar" ? (
              <Calendar events={events} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedEvents).map(([date, eventsOnDate], idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:bg-slate-800/70 transition-all">
                    <h3 className="text-xl font-semibold text-white mb-4">📅 {date}</h3>
                    {eventsOnDate.map((event, i) => (
                      <div key={i} className="mb-4">
                        <p className="text-white font-semibold">🌠 {event.title}</p>
                        <p className="text-gray-300 text-sm mt-1">📝 {event.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {!loading && !error && events.length === 0 && selectedMonth && (
          <div className="text-center py-12 text-gray-400">
            No events found for this month and year.
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
