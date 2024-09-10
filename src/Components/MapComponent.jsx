import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1Ijoia3NoaXRpai0tMTIzIiwiYSI6ImNtMG95ZXQ0NTBja2cycXNibmIwNHZ3eHoifQ.8rtnZShe9kR3NjOHxKx7Jw";

const MapComponent = ({ selectedLocation, setLocation, setAddress }) => {
  const [viewport, setViewport] = useState({
    latitude: 28.6139, // Default latitude (Delhi, India)
    longitude: 77.2090, // Default longitude
    zoom: 10,
    width: "100%",
    height: "100%",
  });

  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (!isManual && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prev) => ({
            ...prev,
            latitude,
            longitude,
            zoom: 14,
          }));
          setLocation({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        () => setIsManual(true),
        { timeout: 10000 }
      );
    }
  }, [isManual]);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    const [lng, lat] = lngLat;
    setLocation({ lat, lng });
    fetchAddress(lat, lng);
    setViewport((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      zoom: 14,
    }));
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const feature = data.features[0];
        setAddress(feature.place_name);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick}
      >
        {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
          <Marker latitude={selectedLocation.lat} longitude={selectedLocation.lng}>
            <div onClick={() => setViewport({ ...viewport, latitude: selectedLocation.lat, longitude: selectedLocation.lng, zoom: 14 })}>
              <svg
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "red", stroke: "none", transform: "translate(-10px, -20px)", cursor: "pointer" }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9s-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;