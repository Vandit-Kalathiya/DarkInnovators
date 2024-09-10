import React, { useState } from "react";
import { Link } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import AddAlertIcon from '@mui/icons-material/AddAlert';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-white shadow-lg ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
      <button className="p-3 focus:outline-none" onClick={toggleSidebar}>
        <MenuIcon fontSize="large" className="text-green-600" />
      </button>

      <nav className="mt-10">
        <ul className="space-y-4">
          <li className="flex items-center p-2 text-green-700 bg-green-100 rounded-md">
            <SpaceDashboardIcon />
            {isOpen && (
              <Link to="/" className="ml-3 text-gray-700 font-semibold">
                Dashboard
              </Link>
            )}
          </li>
          
          <li className="flex items-center p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded-md">
            <BarChartIcon />
            {isOpen && <span className="ml-3">Analytics</span>}
          </li>
          
          <li className="flex items-center p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded-md">
            <PeopleAltIcon />
            {isOpen && <span className="ml-3">Users</span>}
          </li>
          
          <li className="flex items-center p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded-md">
            <SettingsIcon />
            {isOpen && <span className="ml-3">Settings</span>}
          </li>

          <li className="flex items-center p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded-md">
            <SettingsIcon />
            {isOpen && (
              <Link to="/Dashboard/profilepage" className="ml-3">
                Profile
              </Link>
            )}
          </li>
          
          <li className="flex items-center p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 rounded-md">
            <AddAlertIcon />
            {isOpen && (
              <Link to="/user/form1" className="ml-3">
                SOS
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;