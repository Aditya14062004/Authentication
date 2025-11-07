import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">

      {/* Subtle glowing circles in background */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-purple-300/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Centered Welcome Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md px-12 py-16 rounded-3xl shadow-2xl text-center border border-white/20 animate-fadeIn">
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 drop-shadow-md">
          Welcome ✨
        </h1>
        <p className="text-lg text-gray-200 font-light max-w-md mx-auto">
          You’ve successfully logged in.  
          Enjoy your seamless experience with  
          <span className="text-yellow-300 font-medium"> your personalized dashboard</span>.
        </p>
      </div>

      {/* Footer text */}
      <p className="absolute bottom-5 text-sm text-gray-300">
        © {new Date().getFullYear()} Aditya Pratap Singh — All rights reserved
      </p>
    </div>
  );
};

export default Home;