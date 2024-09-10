import React from "react";
import image from "../assets/imagetemp.png";
const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex bg-green-500 text-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Welcome back 👋</h2>
            <p className="mb-6">
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
            </p>
            <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Go now
            </button>
          </div>
          <img src={image} alt="image here" className="w-80" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-600">FEATURED APP</h3>
          <div className="mt-4 text-gray-700">
            <h4 className="text-lg font-bold">
              The Rise of Remote Work: Benefits, Challenges, and Solutions
            </h4>
            <p className="mt-2">
              The aroma of freshly brewed coffee filled the air, awakening my
              senses as I delved into the complexities of remote work...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
