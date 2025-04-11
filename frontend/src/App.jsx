import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Events from "./pages/events";
import RecommendationsPage from "./pages/recommendations"; // Import the new page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar Component */}
        <Navbar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/recommendations" element={<RecommendationsPage />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
