// Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              StarSpotter
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              Events
            </Link>
            <Link
              to="/recommendations"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              My Spots
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/recommendations"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              My Spots
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
