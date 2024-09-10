import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw";

const MapPage = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 14,
    width: "100%",
    height: "100%",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve location data from localStorage
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      const { lat, lng } = JSON.parse(storedLocation);
      setViewport((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
      setSelectedLocation({ lat, lng });
    } else {
      // If no location is found in localStorage, redirect to HomePage
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Map Page</h1>

      <div className="w-full h-96 border rounded-lg overflow-hidden shadow-lg mb-4">
        <ReactMapGL
          {...viewport}
          mapboxAccessToken={MAPBOX_TOKEN}
          onMove={(evt) => setViewport(evt.viewState)} // For zoom and pan functionality
          mapStyle="mapbox://styles/mapbox/streets-v11"
          style={{ width: "100%", height: "100%" }}
        >
          {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
            <Marker
              latitude={selectedLocation.lat}
              longitude={selectedLocation.lng}
            >
              <div>
                <svg
                  height="20"
                  viewBox="0 0 24 24"
                  style={{
                    fill: "red",
                    stroke: "none",
                    transform: "translate(-10px, -20px)",
                  }}
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapPage;