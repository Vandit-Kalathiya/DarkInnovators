import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../Components/AdminComponent/Sidebar";
import Header from "../../Components/AdminComponent/Header";

const AdminDashboard = () => {
  // Example data for the chart
  const data = [
    { name: "Mon", users: 400 },
    { name: "Tue", users: 300 },
    { name: "Wed", users: 200 },
    { name: "Thu", users: 278 },
    { name: "Fri", users: 189 },
  ];

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-green-500 overflow-y-auto">
        {/* Real-Time Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Real-Time Alerts</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Add Alert
            </button>
          </div>
          {/* Alerts List */}
          <ul>
            <li className="border-b py-2">
              Alert 1: High flood risk in Region A
            </li>
            <li className="border-b py-2">
              Alert 2: Earthquake detected in Region B
            </li>
            <li className="border-b py-2">
              Alert 3: Severe weather warning in Region C
            </li>
          </ul>
        </div>

        {/* Incident Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Incident Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Incidents</h3>
              <p className="text-2xl font-bold">50</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Active Responses</h3>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Critical Alerts</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Resource Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volunteer Coordination */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Volunteer Coordination</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Active Volunteers</h3>
              <p className="text-2xl font-bold">120</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Volunteers Assigned</h3>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>
        </div>

        {/* Analytics and Reports */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Analytics and Reports</h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Incident Trends</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#2196F3"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Resource Utilization</h3>
              {/* Placeholder for Chart or Table */}
            </div>
          </div>
        </div>

        {/* Communication Tools */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Communication Tools</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Message Board</h3>
            <textarea
              className="w-full h-24 p-2 border rounded-lg"
              placeholder="Type your message here..."
            ></textarea>
          </div>
        </div>

        {/* Admin Roles and Permissions */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Admin Roles and Permissions
          </h2>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
              {/* Additional rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Alerts and Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Alerts and Notifications
          </h2>
          <div className="flex items-center mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Configure Alerts
            </button>
          </div>
          {/* Alert Configuration or List */}
        </div>

        {/* Customize Dashboard */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Customize Dashboard</h2>
          <div className="space-y-4">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Add Widget
            </button>
            {/* Widget Customization Options */}
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;