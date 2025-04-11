import React from "react";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/src/assets/public/vecteezy_space-flight-above-earth-4k_21570538.mp4"
        autoPlay
        loop
        muted
      ></video>


      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-500">StarSpotters</span>
        </h1>
        <p className="text-lg max-w-xl">
          Discover cosmic events in real-time and explore the beauty of the universe.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Home;
