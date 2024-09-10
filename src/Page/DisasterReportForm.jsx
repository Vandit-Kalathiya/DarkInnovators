import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MapComponent from "../Components/MapComponent.jsx"; // Import the Map component
import { toast } from "react-toastify";

const DisasterReportForm = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    location: "",
    severity: "",
    description: "",
    contactInfo: "",
    image: null,
    video: null,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload with preview
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "image") {
        setFilePreview(URL.createObjectURL(files[0]));
      }
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Please select a location on the map.");
      return;
    }

    const form = new FormData();
    form.append("disasterType", formData.disasterType);
    form.append("location", JSON.stringify(selectedLocation)); // Assuming location is a JSON object
    form.append("severity", formData.severity);
    form.append("description", formData.description);
    form.append("contactInfo", formData.contactInfo);
    // form.append("image", formData.image);
    // form.append("video", formData.video);

    setLoading(true);
    

    axios.post('http://localhost:8080/user/disaster/report/send', form, {
      headers: {  
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Include auth token if needed
      }
    })
    .then((response) => {
      setLoading(false);
      console.log('Report submitted successfully:', response.data);
      toast.success("Form submitted successfully...")
      navigate("/user/dashboard")
    })
    .catch((error) => {
      setLoading(false);
      console.error('There was an error submitting the report:', error);
    });
  };

  // const [formData, setFormData] = useState({
  //   disasterType: "",
  //   location: "",
  //   severity: "",
  //   description: "",
  //   contactInfo: "",
  //   file: null,
  // });

  // const [selectedLocation, setSelectedLocation] = useState(null);
  // const [address, setAddress] = useState("");
  // const [filePreview, setFilePreview] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // // Handle form input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // // Handle file upload with preview
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, file });
  //     setFilePreview(URL.createObjectURL(file));
  //   }
  // };

  // // Form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!selectedLocation) {
  //     alert("Please select a location on the map.");
  //     return;
  //   }

  //   const reportData = {
  //     ...formData,
  //     location: selectedLocation,
  //     address,
  //   };

  //   localStorage.setItem("disasterReportData", JSON.stringify(reportData));
  //   localStorage.setItem("location", JSON.stringify(selectedLocation));

  // };
  return (
    <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Form Section */}
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-green-700 mb-4">
            Report a Disaster
          </h1>
          <p className="text-gray-600 mb-6">
            Please fill out the form to report a disaster. Make sure to select a
            location on the map.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Disaster Type
                </label>
                <select
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  required
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
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  required
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
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                {filePreview && (
                  <div className="mt-2">
                    <img
                      src={filePreview}
                      alt="File preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700">
                  Upload Video
                </label>
                <input
                  type="file"
                  name="video"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Submit Report
            </button>
          </form>
        </div>

        <div className="w-1/2 mt-36 mr-8 relative">
          <MapComponent
            selectedLocation={selectedLocation}
            setLocation={setSelectedLocation}
            setAddress={setAddress}
            setLoading={setLoading}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div className="loader" />{" "}
              {/* You can replace this with a proper loading spinner */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterReportForm;
