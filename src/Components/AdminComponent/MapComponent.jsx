import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw"; // Replace with your Mapbox token

const MapComponent = ({ selectedLocation, setLocation, setAddress, setLoading }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 14,
    width: "100%",
    height: "100%",
  });

  useEffect(() => {
    // Check if there's a saved location in localStorage
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      const { lat, lng } = JSON.parse(storedLocation);
      setViewport((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
      setLocation({ lat, lng });
    }
  }, [setLocation]);

  const handleMapClick = (e) => {
    const [lng, lat] = e.lngLat;
    setLocation({ lat, lng });
    setLoading(true);

    // Fetch address based on coordinates
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          setAddress(data.features[0].place_name);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)} // Zoom and pan functionality
      onClick={handleMapClick} // Capture location click
      mapStyle="mapbox://styles/mapbox/streets-v11"
      style={{ width: "100%", height: "100%" }}
    >
      {selectedLocation && (
        <Marker latitude={selectedLocation.lat} longitude={selectedLocation.lng}>
          <div>
            <svg
              height="20"
              viewBox="0 0 24 24"
              style={{ fill: "red", transform: "translate(-10px, -20px)" }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
        </Marker>
      )}
    </ReactMapGL>
  );
};

export default MapComponent;