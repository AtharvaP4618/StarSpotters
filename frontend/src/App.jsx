import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer"; // Import Footer component
import Home from "./pages/home";
import Events from "./pages/events";
import RecommendationsPage from "./pages/recommendations";
import SkyMap from "./pages/skymap"; // Import Sky Map page
import EduResources from "./pages/eduresources"; // Import Educational Resources page
import Dashboard from "./pages/dashboard"; // Import Dashboard page

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar Component */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/skymap" element={<SkyMap />} /> {/* Sky Map Route */}
            <Route path="/resources" element={<EduResources />} /> {/* Educational Resources Route */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
          </Routes>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
