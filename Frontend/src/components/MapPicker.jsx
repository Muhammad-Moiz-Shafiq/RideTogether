import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultPosition = [33.6844, 73.0479]; // Islamabad as default

const MapPicker = ({ onSelect, initialPosition = defaultPosition, onClose, type = "start" }) => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // Center map on user's location if permission granted and type is 'start'
  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView(initialPosition, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap.current);

      // Only use geolocation for starting point
      if (type === "start" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            leafletMap.current.setView([latitude, longitude], 15);
            L.circle([latitude, longitude], { radius: 30, color: 'blue' }).addTo(leafletMap.current);
          },
          () => {},
          { enableHighAccuracy: true }
        );
      }

      leafletMap.current.on("click", async function (e) {
        const { lat, lng } = e.latlng;
        setLoading(true);
        setError("");
        try {
          // Reverse geocode using Nominatim
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
          const response = await fetch(url);
          const data = await response.json();
          let address = data.display_name || `${lat}, ${lng}`;
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            markerRef.current = L.marker([lat, lng]).addTo(leafletMap.current);
          }
          if (onSelect) onSelect({ address, lat, lng });
        } catch (err) {
          setError("Could not fetch address. Try again.");
        } finally {
          setLoading(false);
        }
      });
    }
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        markerRef.current = null;
      }
    };
  }, [initialPosition, onSelect, type]);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearching(true);
    setError("");
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        leafletMap.current.setView([latNum, lonNum], 16);
        if (markerRef.current) {
          markerRef.current.setLatLng([latNum, lonNum]);
        } else {
          markerRef.current = L.marker([latNum, lonNum]).addTo(leafletMap.current);
        }
        // Optionally, auto-select on search:
        // if (onSelect) onSelect({ address: display_name, lat: latNum, lng: lonNum });
      } else {
        setError("No results found for that address.");
      }
    } catch (err) {
      setError("Could not search for address. Try again.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      {/* Fixed overlay backdrop */}
      <div style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        background: "rgba(0,0,0,0.5)", 
        zIndex: 9998,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }} />
      
      {/* Modal Content */}
      <div style={{ 
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        width: "85%",
        maxWidth: "600px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        zIndex: 9999,
        overflow: "hidden"
      }}>
        {/* Search Bar */}
        <div style={{
          padding: "12px 12px 8px 12px",
          borderBottom: "1px solid #eee"
        }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for a place or address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={searching}
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
        
        {/* Map */}
        <div style={{ position: "relative" }}>
          <div ref={mapRef} style={{ width: "100%", height: "350px" }} />
          {loading && (
            <div style={{ position: "absolute", top: "20px", left: "20px", background: "#fff", padding: "8px", borderRadius: "4px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
              <span>Loading address...</span>
            </div>
          )}
          {error && (
            <div style={{ position: "absolute", top: "20px", left: "20px", background: "#fff0f0", color: "#b00", padding: "8px", borderRadius: "4px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
              {error}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #eee", textAlign: "right" }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MapPicker; 