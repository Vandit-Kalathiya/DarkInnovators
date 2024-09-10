import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FormManage from "../Components/FormManage";

const MAPBOX_TOKEN = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw";

const HomePage = () => {
  const [viewport, setViewport] = useState({
    latitude: 28.6139, // Default latitude (Delhi, India)
    longitude: 77.2090, // Default longitude
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [address, setAddress] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    plotNo: "",
    referencePlace: "",
    city: "",
    state: "",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isManual && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prev) => ({
            ...prev,
            latitude,
            longitude,
            zoom: 5,
          }));
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        () => setIsManual(true)
      );
    }
  }, [isManual]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const feature = data.features[0];
        setAddress(feature.place_name);
        parseAddressComponents(feature);
      } else {
        setAddress("Address not found");
        clearManualLocation();
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
      clearManualLocation();
    }
  };
  
  
  

  const parseAddressComponents = (feature) => {
    const context = feature.context || [];
    const newManualLocation = {
      plotNo: feature.address || "",
      referencePlace: feature.text || "",
      city: "",
      state: "",
    };

    context.forEach((c) => {
      if (c.id.startsWith("place")) {
        newManualLocation.city = c.text;
      }
      if (c.id.startsWith("region")) {
        newManualLocation.state = c.text;
      }
    });

    setManualLocation(newManualLocation);
  };

  const clearManualLocation = () => {
    setManualLocation({
      plotNo: "",
      referencePlace: "",
      city: "",
      state: "",
    });
  };

  const handleManualInput = (e) => {
    setManualLocation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleManualSubmit = async () => {
    const { plotNo, referencePlace, city, state } = manualLocation;
    const formattedAddress = `${plotNo}, ${referencePlace}, ${city}, ${state}`;
    setAddress(formattedAddress);
  
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedAddress}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const { center } = data.features[0];
        setLocation({ lat: center[1], lng: center[0] });
        setViewport((prev) => ({
          ...prev,
          latitude: center[1],
          longitude: center[0],
          zoom: 14,
        }));
        setSelectedLocation({ lat: center[1], lng: center[0] });
  
        localStorage.setItem(
          "location",
          JSON.stringify({ lat: center[1], lng: center[0] })
        );
        navigate("/adminpage");
      } else {
        alert("Could not geocode the entered address.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      alert("Error geocoding the entered address.");
    }
  };

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat; 

    setSelectedLocation({ lat, lng });
    setLocation({ lat, lng });
    fetchAddress(lat, lng);

    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      zoom: 14,
    }));
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Disaster Location Detection
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        {isManual ? (
          <div className="flex flex-col gap-2 w-full sm:max-w-md">
            <input
              type="text"
              name="plotNo"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              placeholder="Plot No"
              value={manualLocation.plotNo}
              onChange={handleManualInput}
            />
            <input
              type="text"
              name="referencePlace"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              placeholder="Reference Place"
              value={manualLocation.referencePlace}
              onChange={handleManualInput}
            />
            <input
              type="text"
              name="city"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              placeholder="City"
              value={manualLocation.city}
              onChange={handleManualInput}
            />
            <input
              type="text"
              name="state"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              placeholder="State"
              value={manualLocation.state}
              onChange={handleManualInput}
            />
            <button
              onClick={handleManualSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsManual(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Enter Location Manually
          </button>
        )}
      </div>

      <div className="flex-grow w-full h-full border rounded-lg overflow-hidden shadow-lg">
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={MAPBOX_TOKEN}
          onMove={(evt) => setViewport(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={handleMapClick}
          className="w-full h-full"
        >
          {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
            <Marker latitude={selectedLocation.lat} longitude={selectedLocation.lng}>
              <div>
                <svg
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ fill: "red", stroke: "none", transform: "translate(-10px, -20px)" }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </Marker>
          )}
        </ReactMapGL>
      </div>
      <div className="text-lg font-medium text-gray-700 w-full max-w-md">
        <p>
          <strong>Selected Address:</strong>{" "}
          {address ? address : "Click on the map to select a location"}
        </p>
      </div>
    </div>
  );
};

export default HomePage;