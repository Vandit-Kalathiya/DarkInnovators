import { useState, useRef, useEffect } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify"; // Ensure this import

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState(""); // State to store the role
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

  // Fetch user role from backend
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.post("http://localhost:8080/auth/roles", null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const fetchedRole = response.data.role; // assuming the backend sends { role: "user" } or { role: "vendor" }
        setRole(fetchedRole);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if(localStorage.getItem("authToken")){
      fetchUserRole();
    }
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

  const handleLogin = (e)=>{
    e.preventDefault()
    navigate("/login")
  }
  return (
    <nav className="bg-primary dark:bg-dark p-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <a
          href="#"
          className="text-sarthak_d dark:text-light text-2xl font-bold font-heading"
        >
          Disaster Watch
        </a>

        {/* Navbar Links */}
        <div className="flex-grow flex items-center justify-center space-x-6">
          {/* Home */}
          <a
            href="#"
            className="text-sarthak_d dark:text-muted-foreground font-medium hover:text-white dark:hover:text-light font-sans"
          >
            HOME
          </a>

          {/* Conditionally render dashboard based on role */}
          {role === "user" && (
            <Link
              to="/dashboard/user"
              className="text-sarthak_d dark:text-muted-foreground font-medium hover:text-white dark:hover:text-light font-sans"
            >
              USER DASHBOARD
            </Link>
          )}
          {role === "vendor" && (
            <Link
              to="/dashboard/vendor"
              className="text-sarthak_d dark:text-muted-foreground font-medium hover:text-white dark:hover:text-light font-sans"
            >
              VENDOR DASHBOARD
            </Link>
          )}

          <a
            href="#"
            className="text-sarthak_d dark:text-muted-foreground font-medium hover:text-white dark:hover:text-light font-sans"
          >
            ABOUT
          </a>

          <a
            href="#"
            className="text-sarthak_d dark:text-muted-foreground font-medium hover:text-white dark:hover:text-light font-sans"
          >
            CONTACT
          </a>
        </div>

        {/* User Profile */}
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
    </nav>
  );
};

export default Navbar;
