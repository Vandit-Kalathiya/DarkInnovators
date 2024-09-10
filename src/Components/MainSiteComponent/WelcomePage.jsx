import React from "react";
import DisasterImage from "../../assets/DisasterImage.jpeg";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex h-[91vh] items-center justify-between bg-white dark:bg-gray-900">
      {/* Left side: Text content */}
      <div className="w-full md:w-1/2 p-8 md:p-16">
        <h1 className="text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to Disaster Watch
        </h1>
        <h2 className="text-2xl text-yellow-600 dark:text-yellow-500 mb-4">
          Join our platform
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Join a community-driven platform where you can report and track
          natural disasters in real-time. Help make the world safer by
          contributing to our collective awareness.
        </p>
        <Link to= "/login" className="bg-primary text-white dark:bg-green-700 px-6 py-3 rounded-md">
          Get Started
        </Link>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-1/2">
        <img
          src={DisasterImage} // Replace with your actual image path
          alt="Disaster Watch illustration"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default WelcomePage;