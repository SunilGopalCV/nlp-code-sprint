import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-4 px-6 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h1 className="text-5xl font-extrabold font-event text-white tracking-tight mb-1 animate-fade-in-down">
          Code Sprint
        </h1>
        <p className="text-gray-400 text-sm font-medium animate-fade-in-up font-sans">
          An event under{" "}
          <span className="text-xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tight animate-fade-in-down font-mono">
            Anveshan
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
