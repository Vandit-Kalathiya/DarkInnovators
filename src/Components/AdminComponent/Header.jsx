import { useState, useRef, useEffect } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [role, setRole] = useState(""); // State to store the role
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/auth/logout",
        null, // No body is required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("authToken");
      console.log('Logged out successfully:', response.data);
      toast.success("Logged out successfully...");
      navigate("/");
    } catch (error) {
      console.error('There was an error logging out:', error);
      toast.error("Error logging out. Please try again.");
    }
  };


  return (
    <header className="bg-green-600 p-4 flex items-center justify-between shadow-lg">
      <div className="text-lg font-bold text-white">
        🚨 Disaster Reporting Portal
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search reports..."
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none shadow-md"
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4 text-green-600">
          <svg
            className="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18Zm9.7,2.3a1,1,0,0,1-1.4,0l-4.1-4.1a1,1,0,0,1,0-1.4A1,1,0,0,1,15,15l4.1,4.1A1,1,0,0,1,19.7,20.3Z" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/notifications" className="text-white hover:text-yellow-300">
          <i className="fas fa-bell"></i>
        </Link>
        <Link to="/global" className="text-white hover:text-yellow-300">
          <i className="fas fa-globe"></i>
        </Link>
        <Link to="/settings" className="text-white hover:text-yellow-300">
          <i className="fas fa-cog"></i>
        </Link>
        
        <div className="relative">
          <FaUserLarge
            className="text-sarthak_d dark:text-light hover:text-white text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg"
            >
              <div className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                <p className="font-bold">User Name</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  user@example.com
                </p>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <Button
                onClick={localStorage.getItem("authToken")?handleLogout:handleLogin}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {localStorage.getItem("authToken")? "Logout" : "Log in"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
