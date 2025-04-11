import React from "react";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/video_background.mp4"
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-extrabold mb-4">
            Discover the Universe <span className="text-blue-500">One Star at a Time</span>
          </h1>
          <p className="text-lg max-w-xl mb-6">
            Explore cosmic events in real-time, find dark-sky locations, and get personalized stargazing recommendations.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg">
            Explore Now
          </button>
        </div>
      </div>

      {/* App Features Section */}
      <div className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <h2 className="text-center text-4xl font-bold mb-12">Why Choose StarSpotters?</h2>

        {/* Feature Cards */}
        <div className="max-w-4xl mx-auto space-y-12 px-6">
          {/* Feature 1 */}
          <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300">
            <img
              src="/images/event_tracking.jpg"
              alt="Event Tracking"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">Real-Time Event Tracking</h3>
              <p className="text-gray-300 mt-2">
                Stay updated on meteor showers, eclipses, planetary alignments, and more with real-time event aggregation.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300">
            <img
              src="/images/light_pollution_map.jpg"
              alt="Light Pollution Mapping"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">Light Pollution Mapping</h3>
              <p className="text-gray-300 mt-2">
                Find the best dark-sky locations using light pollution data combined with elevation and weather information.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300">
            <img
              src="/images/stargazing.jpg"
              alt="Stargazing Score"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white">Personalized Stargazing Recommendations</h3>
              <p className="text-gray-300 mt-2">
                Get a customized “Stargazing Score” based on sky quality, weather conditions, and moon phases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-4 text-center text-gray-400">
        &copy; 2025 StarSpotters. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
