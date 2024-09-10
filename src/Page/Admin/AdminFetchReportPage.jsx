import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../Components/AdminComponent/MapComponent"; // Import the Map component

const AdminFetchReportPage = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    severity: "",
    description: "",
    contactInfo: "",
    file: null,
  }); 

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for submission status
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from localStorage and populate formData
    const storedData = JSON.parse(localStorage.getItem("disasterReportData"));
    const storedLocation = JSON.parse(localStorage.getItem("location"));

    if (storedData) {
      setFormData(storedData);
      setSelectedLocation(storedLocation);
      setAddress(storedData.address);
      // if (storedData.file) {
      //   setFilePreview(URL.createObjectURL(storedData.file));
      // }
      setIsSubmitted(true); // Set form as submitted to disable fields
    }
  }, []);

  return (
    <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Form Section */}
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-green-700 mb-4">
            Reported Disaster Information
          </h1>
          <p className="text-gray-600 mb-6">
            This is the detailed report of the disaster you have submitted.
          </p>
          <form className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Disaster Type
                </label>
                <select
                  name="disasterType"
                  value={formData.disasterType}
                  className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  disabled // Field is now disabled
                >
                  <option value="">Select type</option>
                  <option value="flood">Flood</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="fire">Fire</option>
                  <option value="storm">Storm</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Severity
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  disabled // Field is now disabled
                >
                  <option value="">Select severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Contact Info
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={formData.contactInfo}
                  disabled // Field is now disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  value={formData.description}
                  disabled // Field is now disabled
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-green-700">
                  Uploaded File
                </label>
                {filePreview && (
                  <div className="mt-2">
                    <img
                      src={filePreview}
                      alt="File preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div> */}
            </div>
          </form>
        </div>

        <div className="w-1/2 mt-36 mr-8 relative">
          <MapComponent
            selectedLocation={selectedLocation}
            setLocation={setSelectedLocation}
            setAddress={setAddress}
            setLoading={setLoading}
            isReadOnly={true} // Ensure map is read-only
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div className="loader" /> {/* You can replace this with a proper loading spinner */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFetchReportPage;