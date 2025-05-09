import React, { useState, useEffect } from "react";
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

  // Apply filters
  const applyFilters = async () => {
    try {
      setLoading(true);

      // Prepare filter parameters for the API
      const apiFilters = {};

      // Apply location filters
      if (filters.startingPoint) {
        apiFilters.startingPoint = filters.startingPoint;
      }

      if (filters.destination) {
        apiFilters.destination = filters.destination;
      }

      if (filters.vehicleType) {
        apiFilters.vehicleType = filters.vehicleType;
      }

      // Get filtered rides from API
      let results = await rideService.getRidesByFilter(apiFilters);

      // Additional client-side filtering
      if (filters.budget) {
        const budget = parseInt(filters.budget);
        results = results.filter((ride) => parseInt(ride.price) <= budget);
      }

      if (filters.departureTime) {
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

      // Apply current sort to the filtered results
      const sortedResults = sortRides(results, currentSort);
      setFilteredRides(sortedResults);
      setLoading(false);
    } catch (err) {
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
