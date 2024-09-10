import React from "react";

const Header = () => {
  return (
    <header className="bg-white  p-4 flex items-center justify-between">
      <div className="text-lg font-semibold text-green-600">🌟 My App</div>
      <div className="relative text-gray-600">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18Zm9.7,2.3a1,1,0,0,1-1.4,0l-4.1-4.1a1,1,0,0,1,0-1.4A1,1,0,0,1,15,15l4.1,4.1A1,1,0,0,1,19.7,20.3Z" />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <i className="fas fa-bell text-gray-600"></i>
        <i className="fas fa-globe text-gray-600"></i>
        <i className="fas fa-cog text-gray-600"></i>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
          <img src="https://via.placeholder.com/40" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
