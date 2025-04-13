import React, { useState, useEffect } from "react";
import { 
  format, 
  parse,
  parseISO,
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay,
  addMonths,
  subMonths,
  getDay
} from "date-fns";

const Calendar = ({ events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayEvents, setDisplayEvents] = useState([]);
  const [eventsByDate, setEventsByDate] = useState({});
  
  // Debug what we're receiving
  useEffect(() => {
    console.log("Raw events received:", events);
    
    // Process events by date
    const eventMap = {};
    events.forEach(event => {
      if (!event.date) return;
      
      // Parse the date string to a Date object
      // Handle both formats: "2025-01-02" and "January 2, 2025"
      let eventDate;
      try {
        eventDate = parseISO(event.date);
      } catch (error) {
        // Fallback to other format
        try {
          eventDate = parse(event.date, "MMMM d, yyyy", new Date());
        } catch (innerError) {
          console.error("Could not parse date:", event.date);
          return;
        }
      }
      
      // Create a standardized key for lookup
      const dateKey = format(eventDate, "yyyy-MM-dd");
      
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      
      eventMap[dateKey].push(event);
    });
    
    console.log("Processed events by date:", eventMap);
    setEventsByDate(eventMap);
  }, [events]);
  
  // Generate calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = monthStart;
  const endDate = monthEnd;
  
  const daysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate
  });
  
  // Check if a day has events
  const hasEvents = (day) => {
    try {
      const dateKey = format(day, "yyyy-MM-dd");
      return !!eventsByDate[dateKey] && eventsByDate[dateKey].length > 0;
    } catch (error) {
      console.error("Error checking for events:", error);
      return false;
    }
  };
  
  // Handle date click with proper state updates
  const handleDateClick = (day) => {
    console.log("Date clicked:", format(day, "yyyy-MM-dd"));
    setSelectedDate(day);
    
    const dateKey = format(day, "yyyy-MM-dd");
    console.log("Looking for events with key:", dateKey);
    console.log("Available events:", eventsByDate[dateKey]);
    
    setDisplayEvents(eventsByDate[dateKey] || []);
  };
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  
  // Calendar grid generation
  const renderCalendarCells = () => {
    const daySquares = [];
    
    // Add empty cells for days before the start of month
    const startDay = getDay(monthStart);
    for (let i = 0; i < startDay; i++) {
      daySquares.push(
        <div key={`empty-${i}`} className="h-14 bg-transparent"></div>
      );
    }
    
    // Add days of the month
    daysInMonth.forEach(day => {
      const dateKey = format(day, "yyyy-MM-dd");
      const hasEventsForDay = hasEvents(day);
      
      daySquares.push(
        <button
          key={day.toString()}
          onClick={() => handleDateClick(day)}
          className={`
            h-14 w-full flex flex-col items-center justify-center relative 
            rounded-lg transition-colors cursor-pointer
            ${isSameDay(day, selectedDate) 
              ? "bg-blue-600 text-white" 
              : "bg-slate-800/30 text-white hover:bg-slate-700/50"
            }
            ${hasEventsForDay 
              ? "ring-2 ring-blue-400" 
              : ""
            }
          `}
          type="button"
        >
          <span className="text-lg">{format(day, "d")}</span>
          {hasEventsForDay && (
            <span className="absolute bottom-1 w-2 h-2 bg-blue-400 rounded-full"></span>
          )}
        </button>
      );
    });
    
    return daySquares;
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-gray-400 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarCells()}
      </div>
      
      {/* Debug info - keep this temporarily */}
      <div className="mt-4 text-xs text-gray-500">
        Selected date: {format(selectedDate, "yyyy-MM-dd")}
        <br />
        Events found: {displayEvents.length}
      </div>
      
      {/* Event Display Section */}
      {displayEvents.length > 0 && (
        <div className="mt-6 bg-slate-800/80 rounded-lg p-6 border border-slate-600">
          <h3 className="text-xl font-semibold text-white mb-4">
            Events for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          <div className="space-y-4">
            {displayEvents.map((event, idx) => (
              <div 
                key={idx}
                className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors border border-slate-600"
              >
                <p className="text-white font-semibold">🌠 {event.title}</p>
                <p className="text-gray-300 text-sm mt-1">📝 {event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
