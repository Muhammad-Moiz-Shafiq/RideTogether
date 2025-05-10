import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/SearchRide/HeroSection";
import SearchForm from "../components/SearchRide/SearchForm";
import RideResults from "../components/SearchRide/RideResults";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import rideService from "../services/rideService";
import "../components/SearchRide/SearchRide.css";

const SearchRide = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSort, setCurrentSort] = useState("price-low");
  const [filters, setFilters] = useState({
    startingPoint: "",
    destination: "",
    vehicleType: "",
    passengerCapacity: "",
    budget: "",
    departureTime: "",
  });
  const location = useLocation();

  // Initialize data on mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const data = await rideService.getAllRides();
        setRides(data);
        // Apply initial sorting
        const sortedRides = sortRides(data, "price-low");
        setFilteredRides(sortedRides);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  useEffect(() => {
    // Read query params and pre-fill filters if present
    const params = new URLSearchParams(location.search);
    const startingPoint = params.get("startingPoint") || "";
    const destination = params.get("destination") || "";
    const passengers = params.get("passengers") || "";
    const time = params.get("time") || "";

    const newFilters = {
      ...filters,
      startingPoint: startingPoint,
      destination: destination,
      passengerCapacity: passengers ? parseInt(passengers) : "",
      departureTime:
        time === "morning" ? "08:00" : time === "evening" ? "16:00" : "",
    };

    setFilters(newFilters);

    // Automatically trigger search if startingPoint or destination is provided
    if (startingPoint || destination) {
      setTimeout(() => {
        // Manually perform search using the API
        const performSearch = async () => {
          try {
            setLoading(true);
            console.log("Searching with filters:", newFilters);

            // Build the search query
            const apiFilters = {};

            if (startingPoint) {
              apiFilters.startingPoint = startingPoint;
            }

            if (destination) {
              apiFilters.destination = destination;
            }

            console.log("API filters:", apiFilters);

            // Get filtered rides from API
            const results = await rideService.getRidesByFilter(apiFilters);
            console.log("Search results:", results);

            // Apply current sort to the filtered results
            const sortedResults = sortRides(results, currentSort);
            setFilteredRides(sortedResults);
            setLoading(false);

            // Scroll to results section
            document
              .getElementById("search-section")
              ?.scrollIntoView({ behavior: "smooth" });
          } catch (err) {
            console.error("Search error:", err);
            setError(err.message);
            setLoading(false);
          }
        };

        performSearch();
      }, 300);
    }
  }, [location.search]);

  // Apply filters
  const applyFilters = async () => {
    try {
      setLoading(true);
      console.log("Applying filters:", filters);

      // Prepare filter parameters for the API
      const apiFilters = {};

      // Only add non-empty filters
      if (filters.startingPoint && filters.startingPoint.trim() !== "") {
        apiFilters.startingPoint = filters.startingPoint;
      }

      if (filters.destination && filters.destination.trim() !== "") {
        apiFilters.destination = filters.destination;
      }

      if (filters.vehicleType && filters.vehicleType !== "") {
        apiFilters.vehicleType = filters.vehicleType;
      }

      console.log("API filters:", apiFilters);

      // Get filtered rides from API
      let results = await rideService.getRidesByFilter(apiFilters);
      console.log("API search results:", results);

      // Additional client-side filtering
      if (filters.budget && filters.budget !== "") {
        const budget = parseInt(filters.budget);
        results = results.filter((ride) => parseInt(ride.price) <= budget);
      }

      if (filters.departureTime && filters.departureTime !== "") {
        results = results.filter((ride) => {
          const departureHour = parseInt(ride.departureTime.split(":")[0]);

          if (filters.departureTime === "08:00") {
            // Morning rides (8:00 AM - 11:00 AM)
            return departureHour >= 8 && departureHour <= 11;
          } else if (filters.departureTime === "16:00") {
            // Evening rides (4:00 PM - 6:00 PM)
            return departureHour >= 16 && departureHour <= 18;
          }

          return true;
        });
      }

      if (filters.passengerCapacity && filters.vehicleType === "car") {
        const capacity = parseInt(filters.passengerCapacity);
        results = results.filter(
          (ride) =>
            ride.passengerCapacity &&
            parseInt(ride.passengerCapacity) >= capacity
        );
      }

      console.log("Final filtered results:", results);

      // Apply current sort to the filtered results
      const sortedResults = sortRides(results, currentSort);
      setFilteredRides(sortedResults);
      setLoading(false);
    } catch (err) {
      console.error("Filter application error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Sort rides based on sort option
  const sortRides = (ridesToSort, sortOption) => {
    const sorted = [...ridesToSort];

    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        sorted.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case "departure-early":
        sorted.sort((a, b) => {
          const aTime = a.departureTime.split(":").map(Number);
          const bTime = b.departureTime.split(":").map(Number);
          return aTime[0] * 60 + aTime[1] - (bTime[0] * 60 + bTime[1]);
        });
        break;
      case "departure-late":
        sorted.sort((a, b) => {
          const aTime = a.departureTime.split(":").map(Number);
          const bTime = b.departureTime.split(":").map(Number);
          return bTime[0] * 60 + bTime[1] - (aTime[0] * 60 + aTime[1]);
        });
        break;
      default:
        sorted.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    }

    return sorted;
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption);
    // Immediately sort and update the filtered rides with the new sort option
    const sortedRides = sortRides(filteredRides, sortOption);
    setFilteredRides(sortedRides);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      startingPoint: "",
      destination: "",
      vehicleType: "",
      passengerCapacity: "",
      budget: "",
      departureTime: "",
    });
    setCurrentSort("price-low");
    // Apply default sorting
    const sortedRides = sortRides(rides, "price-low");
    setFilteredRides(sortedRides);
  };

  return (
    <>
      <Navbar />

      <HeroSection />

      <section className="py-5 bg-light" id="search-section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="text-center mb-4">Search Available Rides</h2>
            </div>
          </div>

          <SearchForm
            filters={filters}
            handleFilterChange={handleFilterChange}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading rides...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger my-4" role="alert">
              {error}
            </div>
          ) : (
            <RideResults
              rides={filteredRides}
              currentSort={currentSort}
              handleSortChange={handleSortChange}
            />
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SearchRide;
