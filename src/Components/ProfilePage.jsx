import React from "react";
import { MdManageAccounts, MdAccountCircle } from 'react-icons/md';
import HttpsIcon from "@mui/icons-material/Https";
import { FaLock } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

const ProfilePage = () => {
  return (
    <div className="flex flex-1 p-6 bg-gray-100">
      <div className="w-1/6 bg-white p-4 mr-4 rounded-lg h-72">
        <div className="flex text-gray-900 font-semibold mb-6">
          <MdManageAccounts className="mr-1 mt-1" fontSize="large" />
          Account Settings
        </div>
        <div className="flex flex-col items-start space-y-4">
          <button className="flex text-blue-600 font-medium">
            <MdAccountCircle className="mr-1 mt-1" />
            Profile Settings
          </button>
          <button className="text-gray-600 flex">
            <FaLock className="mt-1 mr-1" />
            Password
          </button>
          <button className="text-gray-600 flex">
            <IoIosNotifications className="mt-1 mr-1" />
            Notifications
          </button>
          <button className="text-gray-600">Verification</button>
        </div>
      </div>
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-8">
          <div className="relative">
            <img
              src="https://via.placeholder.com/100"
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer">
              <i className="fas fa-camera text-white"></i>
            </div>
          </div>
          <div className="ml-4">
            <button className="text-blue-600 font-medium">Upload New</button>
            <button className="text-red-600 ml-4">Delete Avatar</button>
          </div>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">First Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Mobile Number</label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Mobile number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">ID</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="ID number"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-2">
                Tax Identification Number
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Tax ID"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">
                Tax Identification Country
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Nigeria</option>
                <option>USA</option>
                <option>Canada</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">
              Residential Address
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Residential address"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
