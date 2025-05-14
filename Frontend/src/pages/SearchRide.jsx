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

  // Initialize data on mount - fetch all rides
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        // Use getAllRides to fetch all rides, not just the user's rides
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
      vehicleType: passengers ? "car" : "", // If passengers are specified, default to car
    };

    setFilters(newFilters);

    // Automatically trigger search if startingPoint or destination is provided
    if (startingPoint || destination || passengers || time) {
      setTimeout(() => {
        // Manually perform search using the API
        const performSearch = async () => {
          try {
            setLoading(true);

            // Build the search query
            const apiFilters = {};

            if (startingPoint) {
              apiFilters.startingPoint = startingPoint;
            }

            if (destination) {
              apiFilters.destination = destination;
            }

            // Get filtered rides from API
            const results = await rideService.getRidesByFilter(apiFilters);

            // Apply additional client-side filtering for time and passengers
            let filteredResults = [...results];

            // Filter by passenger capacity if specified
            if (passengers && parseInt(passengers) > 0) {
              filteredResults = filteredResults.filter(
                (ride) =>
                  ride.vehicleType === "car" &&
                  ride.passengerCapacity &&
                  !isNaN(parseInt(ride.passengerCapacity)) &&
                  parseInt(ride.passengerCapacity) >= parseInt(passengers)
              );
            }

            // Filter by time if specified
            if (time) {
              filteredResults = filteredResults.filter((ride) => {
                if (!ride.departureTime) return false;

                try {
                  const departureHour = parseInt(
                    ride.departureTime.split(":")[0]
                  );

                  if (isNaN(departureHour)) return false;

                  if (time === "morning") {
                    // Morning rides (8:00 AM - 11:00 AM)
                    return departureHour >= 8 && departureHour <= 11;
                  } else if (time === "evening") {
                    // Evening rides (4:00 PM - 6:00 PM)
                    return departureHour >= 16 && departureHour <= 18;
                  }
                } catch (err) {
                  return false;
                }

                return true;
              });
            }

            // Apply current sort to the filtered results
            const sortedResults = sortRides(filteredResults, currentSort);
            setFilteredRides(sortedResults);
            setLoading(false);

            // Scroll to results section
            document
              .getElementById("search-section")
              ?.scrollIntoView({ behavior: "smooth" });
          } catch (err) {
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

      // Get filtered rides from API
      let results = await rideService.getRidesByFilter(apiFilters);

      // Additional client-side filtering
      if (filters.budget && filters.budget !== "") {
        const budget = parseInt(filters.budget);
        results = results.filter(
          (ride) =>
            !isNaN(parseInt(ride.price)) && parseInt(ride.price) <= budget
        );
      }

      if (filters.departureTime && filters.departureTime !== "") {
        results = results.filter((ride) => {
          if (!ride.departureTime) return false;

          try {
            const departureHour = parseInt(ride.departureTime.split(":")[0]);

            if (isNaN(departureHour)) return false;

            if (filters.departureTime === "08:00") {
              // Morning rides (8:00 AM - 11:00 AM)
              return departureHour >= 8 && departureHour <= 11;
            } else if (filters.departureTime === "16:00") {
              // Evening rides (4:00 PM - 6:00 PM)
              return departureHour >= 16 && departureHour <= 18;
            }
          } catch (err) {
            return false;
          }

          return true;
        });
      }

      if (filters.passengerCapacity && filters.passengerCapacity !== "") {
        const capacity = parseInt(filters.passengerCapacity);
        results = results.filter(
          (ride) =>
            // Only apply to cars (either when vehicleType is set to car or not specified)
            (filters.vehicleType === "car" ||
              filters.vehicleType === "" ||
              !filters.vehicleType) &&
            ride.vehicleType === "car" &&
            ride.passengerCapacity &&
            !isNaN(parseInt(ride.passengerCapacity)) &&
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
        sorted.sort((a, b) => {
          const priceA = !isNaN(parseInt(a.price)) ? parseInt(a.price) : 0;
          const priceB = !isNaN(parseInt(b.price)) ? parseInt(b.price) : 0;
          return priceA - priceB;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA = !isNaN(parseInt(a.price)) ? parseInt(a.price) : 0;
          const priceB = !isNaN(parseInt(b.price)) ? parseInt(b.price) : 0;
          return priceB - priceA;
        });
        break;
      case "departure-early":
        sorted.sort((a, b) => {
          if (!a.departureTime) return 1;
          if (!b.departureTime) return -1;

          try {
            const aTime = a.departureTime.split(":").map(Number);
            const bTime = b.departureTime.split(":").map(Number);

            if (aTime.some(isNaN) || bTime.some(isNaN)) {
              return 0;
            }

            return aTime[0] * 60 + aTime[1] - (bTime[0] * 60 + bTime[1]);
          } catch (err) {
            return 0;
          }
        });
        break;
      case "departure-late":
        sorted.sort((a, b) => {
          if (!a.departureTime) return -1;
          if (!b.departureTime) return 1;

          try {
            const aTime = a.departureTime.split(":").map(Number);
            const bTime = b.departureTime.split(":").map(Number);

            if (aTime.some(isNaN) || bTime.some(isNaN)) {
              return 0;
            }

            return bTime[0] * 60 + bTime[1] - (aTime[0] * 60 + aTime[1]);
          } catch (err) {
            return 0;
          }
        });
        break;
      default:
        sorted.sort((a, b) => {
          const priceA = !isNaN(parseInt(a.price)) ? parseInt(a.price) : 0;
          const priceB = !isNaN(parseInt(b.price)) ? parseInt(b.price) : 0;
          return priceA - priceB;
        });
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
