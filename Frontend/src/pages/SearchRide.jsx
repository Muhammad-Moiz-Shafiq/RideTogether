import React, { useState, useEffect } from "react";
import HeroSection from "../components/SearchRide/HeroSection";
import SearchForm from "../components/SearchRide/SearchForm";
import RideResults from "../components/SearchRide/RideResults";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

// Mock data - in a real app this would come from an API
import { ridesData } from "../data/ridesData";

const SearchRide = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [currentSort, setCurrentSort] = useState("price-low");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [filters, setFilters] = useState({
    startingPoint: "",
    endingPoint: "",
    vehicleType: "",
    passengers: "",
    budget: "",
    departureTime: "",
    date: "",
    month: "",
    rideType: "",
  });

  // Initialize data on mount
  useEffect(() => {
    setRides(ridesData);
    setFilteredRides(ridesData);
  }, []);

  // Apply filters
  const applyFilters = () => {
    let results = [...rides];

    // Filter logic
    if (filters.startingPoint) {
      const startingPoint = filters.startingPoint.toLowerCase();
      results = results.filter((ride) => {
        const route = [
          ride.startingPoint.toLowerCase(),
          ...ride.stops.map((stop) => stop.toLowerCase()),
          ride.endingPoint.toLowerCase(),
        ];

        return route.some((loc) => loc.includes(startingPoint));
      });
    }

    if (filters.endingPoint) {
      const endingPoint = filters.endingPoint.toLowerCase();
      results = results.filter((ride) => {
        const route = [
          ride.startingPoint.toLowerCase(),
          ...ride.stops.map((stop) => stop.toLowerCase()),
          ride.endingPoint.toLowerCase(),
        ];

        // Check if starting point is also specified
        if (filters.startingPoint) {
          const startingPoint = filters.startingPoint.toLowerCase();
          const startIndex = route.findIndex((loc) =>
            loc.includes(startingPoint)
          );

          if (startIndex === -1) return false;

          // Find ending point only if it appears after starting point
          return route.some(
            (loc, index) => index > startIndex && loc.includes(endingPoint)
          );
        }

        return route.some((loc) => loc.includes(endingPoint));
      });
    }

    // Prevent starting point and ending point from being the same
    results = results.filter((ride) => {
      if (filters.startingPoint && filters.endingPoint) {
        return (
          filters.startingPoint.toLowerCase() !==
            ride.endingPoint.toLowerCase() &&
          filters.endingPoint.toLowerCase() !== ride.startingPoint.toLowerCase()
        );
      }
      return true;
    });

    // Vehicle type filter
    if (filters.vehicleType) {
      results = results.filter(
        (ride) => ride.vehicleType === filters.vehicleType
      );
    }

    // Passengers filter
    if (filters.passengers) {
      const passengers = parseInt(filters.passengers);
      results = results.filter((ride) => ride.seatsAvailable >= passengers);
    }

    // Budget filter
    if (filters.budget) {
      const budget = parseInt(filters.budget);
      results = results.filter((ride) => ride.price <= budget);
    }

    // Departure time filter
    if (filters.departureTime) {
      results = results.filter((ride) => {
        const filterHours = parseInt(filters.departureTime.split(":")[0]);
        const filterMinutes = parseInt(filters.departureTime.split(":")[1]);
        const rideHours = parseInt(ride.departureTime.split(":")[0]);
        const rideMinutes = parseInt(ride.departureTime.split(":")[1]);

        // Convert to minutes for easier comparison
        const filterTimeInMinutes = filterHours * 60 + filterMinutes;
        const rideTimeInMinutes = rideHours * 60 + rideMinutes;

        // Allow 30 minutes window before and after
        return (
          rideTimeInMinutes >= filterTimeInMinutes - 30 &&
          rideTimeInMinutes <= filterTimeInMinutes + 30
        );
      });
    }

    // Date filter (for daily rides)
    if (filters.date && filters.rideType === "Daily") {
      results = results.filter((ride) => {
        if (ride.frequency !== "Daily") return false;

        const dayOfWeek = new Date(filters.date).getDay();
        const dayMap = {
          0: "Sun",
          1: "Mon",
          2: "Tue",
          3: "Wed",
          4: "Thu",
          5: "Fri",
          6: "Sat",
        };
        return ride.daysAvailable.includes(dayMap[dayOfWeek]);
      });
    }

    // Month filter (for monthly rides)
    if (filters.month && filters.rideType === "Monthly") {
      results = results.filter((ride) => ride.frequency === "Monthly");
      // In a real app, we'd have more logic here to filter by actual month
    }

    // Only available rides
    if (onlyAvailable) {
      results = results.filter((ride) => ride.seatsAvailable > 0);
    }

    // Sort results
    sortRides(results);

    setFilteredRides(results);
  };

  // Sort rides based on currentSort
  const sortRides = (ridesToSort) => {
    const sorted = [...ridesToSort];

    switch (currentSort) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
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
        sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption);
    setFilteredRides(sortRides([...filteredRides]));
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
      endingPoint: "",
      vehicleType: "",
      passengers: "",
      budget: "",
      departureTime: "",
      date: "",
      month: "",
      rideType: "",
    });
    setCurrentSort("price-low");
    setFilteredRides(rides);
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

          <RideResults
            rides={filteredRides}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            currentSort={currentSort}
            handleSortChange={handleSortChange}
            applyFilters={applyFilters}
          />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
};

export default SearchRide;
