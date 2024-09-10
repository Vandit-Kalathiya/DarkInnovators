import React from "react";
import image from "../assets/dashboard.png";

const Dashboard = () => {
  // Example data for statistics
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Reports Over Time',
        data: [30, 45, 60, 75, 90],
        fill: false,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        tension: 0.1
      }
    ]
  };

  return (
    <main className="flex-1 p-6 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Welcome Back Section */}
        <div className="flex bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
              <p className="mb-6 leading-relaxed">
                Stay informed and act quickly. Our platform provides real-time disaster updates and tools to help you respond effectively.
              </p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-green-800 font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out shadow-md">
              Get Started
            </button>
          </div>
          <img
            src={image}
            alt="Disaster Reporting"
            className="w-44 md:w-80 object-contain ml-auto"
          />
        </div>

        {/* Featured Report Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between space-y-4">
          <h3 className="text-2xl font-bold text-green-600">FEATURED REPORT</h3>
          <div className="text-gray-700">
            <h4 className="text-xl font-semibold mb-2">
              Major Flooding in Region X: Impact and Response
            </h4>
            <p className="leading-relaxed text-gray-600">
              Recent heavy rains have caused severe flooding in Region X. Find out about the impact, response efforts, and how you can help.
            </p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mt-4 transition-all duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>

      {/* Recent Reports Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Recent Reports</h3>
        <ul className="space-y-4">
          {/* Example items, replace with dynamic data */}
          <li className="p-4 bg-gray-100 rounded-md shadow-md">
            <h4 className="font-semibold text-gray-800">Earthquake in Region Y</h4>
            <p className="text-gray-600">Magnitude 6.5 earthquake reported. Immediate response needed.</p>
            <button className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out">
              View Details
            </button>
          </li>
          <li className="p-4 bg-gray-100 rounded-md shadow-md">
            <h4 className="font-semibold text-gray-800">Wildfire in Region Z</h4>
            <p className="text-gray-600">Ongoing wildfire. Evacuation orders in effect.</p>
            <button className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out">
              View Details
            </button>
          </li>
        </ul>
      </section>

      {/* Interactive Map Section */}

      {/* Statistics and Analytics Section */}

      {/* Quick Actions Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Quick Actions</h3>
        <div className="flex flex-col space-y-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out">
            Submit New Report
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-green-800 font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out">
            View Ongoing Incidents
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
