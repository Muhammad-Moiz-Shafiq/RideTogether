import React, { useEffect } from "react";

const RideResults = ({ rides, currentSort, handleSortChange }) => {
  // Function to format time (24hr to 12hr format)
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Add animation to ride cards when they appear
  useEffect(() => {
    const rideCards = document.querySelectorAll(".ride-card-animated");

    rideCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-in-up");
      }, index * 100); // Staggered animation
    });
  }, [rides]);

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="mb-3">
            Available Rides{" "}
            <span className="badge bg-primary ms-2">{rides.length}</span>
          </h3>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort by:{" "}
                {currentSort === "price-low"
                  ? "Price: Low to High"
                  : currentSort === "price-high"
                  ? "Price: High to Low"
                  : currentSort === "departure-early"
                  ? "Departure: Earliest"
                  : currentSort === "departure-late"
                  ? "Departure: Latest"
                  : "Sort by"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSortChange("price-low");
                    }}
                  >
                    Price: Low to High
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSortChange("price-high");
                    }}
                  >
                    Price: High to Low
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSortChange("departure-early");
                    }}
                  >
                    Departure: Earliest
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSortChange("departure-late");
                    }}
                  >
                    Departure: Latest
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="rides-container">
        {rides.length > 0 ? (
          rides.map((ride) => {
            // Create badge for vehicle type
            const vehicleBadge =
              ride.vehicleType === "car" ? (
                <span className="badge bg-info me-2">Car</span>
              ) : (
                <span className="badge bg-warning text-dark me-2">Bike</span>
              );

            // Format preferences
            const preferences = [];
            if (ride.vehicleType === "car") {
              if (ride.preferences?.car?.airConditioned)
                preferences.push(
                  <div key="ac" className="me-3 mb-1 small">
                    <i className="fas fa-snowflake text-primary me-1"></i> AC
                  </div>
                );
              if (ride.preferences?.car?.smokingAllowed)
                preferences.push(
                  <div key="smoking" className="me-3 mb-1 small">
                    <i className="fas fa-smoking text-primary me-1"></i> Smoking
                    Allowed
                  </div>
                );
              if (ride.preferences?.car?.petsAllowed)
                preferences.push(
                  <div key="pets" className="me-3 mb-1 small">
                    <i className="fas fa-paw text-primary me-1"></i> Pets
                    Allowed
                  </div>
                );
              if (ride.preferences?.car?.musicAllowed)
                preferences.push(
                  <div key="music" className="me-3 mb-1 small">
                    <i className="fas fa-music text-primary me-1"></i> Music
                  </div>
                );
            } else {
              if (ride.preferences?.bike?.helmetProvided)
                preferences.push(
                  <div key="helmet" className="me-3 mb-1 small">
                    <i className="fas fa-hard-hat text-primary me-1"></i> Helmet
                    Provided
                  </div>
                );
              if (ride.preferences?.bike?.rainGearAvailable)
                preferences.push(
                  <div key="rain" className="me-3 mb-1 small">
                    <i className="fas fa-cloud-rain text-primary me-1"></i> Rain
                    Gear
                  </div>
                );
            }

            // Format trip type
            const tripType =
              ride.tripType === "round-trip" ? "Round Trip" : "One-way";

            return (
              <div
                key={ride._id}
                className="card mb-4 ride-card-animated fade-in"
                data-ride-id={ride._id}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-3">
                        <div>
                          <h5 className="mb-0">{ride.userName}</h5>
                          <div className="text-muted small">
                            Student ID: {ride.studentId}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        {vehicleBadge}
                        <span className="badge bg-success me-2">
                          {tripType}
                        </span>
                      </div>

                      <div className="route-path mb-3">
                        <div className="d-flex align-items-center">
                          <div className="text-center me-2">
                            <i className="fas fa-circle text-success"></i>
                            <div className="route-line"></div>
                            <i className="fas fa-map-marker-alt text-danger"></i>
                          </div>
                          <div>
                            <div className="fw-bold">{ride.startingPoint}</div>
                            <div className="text-muted small">
                              Departure: {formatTime(ride.departureTime)}
                            </div>
                            <div className="my-2"></div>
                            <div className="fw-bold">{ride.destination}</div>
                            {ride.returnTime && (
                              <div className="text-muted small">
                                Return: {formatTime(ride.returnTime)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {ride.stops && ride.stops.length > 0 && (
                        <div className="mb-3">
                          <div className="text-muted">
                            <i className="fas fa-map-signs me-2"></i>Stops:{" "}
                            {ride.stops.join(", ")}
                          </div>
                        </div>
                      )}

                      <div className="mb-3">
                        <div className="text-muted">
                          <i
                            className={`fas fa-${
                              ride.vehicleType === "car" ? "car" : "motorcycle"
                            } me-2`}
                          ></i>
                          {ride.vehicleDetails}
                          {ride.vehicleType === "car" &&
                            ride.passengerCapacity && (
                              <span> (Capacity: {ride.passengerCapacity})</span>
                            )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex flex-wrap">{preferences}</div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="text-md-end mt-3 mt-md-0">
                        <div className="bg-light rounded p-3 mb-3">
                          <h5 className="mb-2">Rs {ride.price}</h5>
                          <div className="border-top pt-3 mt-3 text-start small">
                            <strong>Contact Info:</strong>
                            <br />
                            <div className="text-muted mb-1">
                              <i className="fas fa-user-check me-1"></i>
                              <strong> Preferred:</strong>{" "}
                              {ride.preferredContactMethod}
                            </div>
                            <div className="text-muted mb-1">
                              <i className="fas fa-phone-alt me-1"></i>
                              <strong> Phone:</strong> {ride.phoneNumber}
                              {ride.isPrimaryWhatsapp && (
                                <span className="badge bg-success ms-1">
                                  <i className="fab fa-whatsapp me-1"></i>
                                  WhatsApp
                                </span>
                              )}
                            </div>
                            {ride.email && (
                              <div className="text-muted">
                                <i className="far fa-envelope me-1"></i>
                                <strong> Email:</strong> {ride.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {ride.additionalInfo && (
                    <div className="mt-3 border-top pt-3">
                      <div className="text-muted small">
                        <i className="fas fa-info-circle me-2"></i>
                        <span>{ride.additionalInfo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div id="no-results" className="text-center py-5">
            <i className="fas fa-search fa-3x mb-3 text-secondary"></i>
            <h4>No rides match your search criteria</h4>
            <p className="text-muted">
              Try adjusting your filters or check back later for new rides
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RideResults;
