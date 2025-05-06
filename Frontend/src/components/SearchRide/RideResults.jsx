import React, { useEffect } from "react";

const RideResults = ({
  rides,
  onlyAvailable,
  setOnlyAvailable,
  currentSort,
  handleSortChange,
  applyFilters,
}) => {
  // Function to format time (24hr to 12hr format)
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Function to generate rating stars
  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {halfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </>
    );
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showOnlyAvailable"
                checked={onlyAvailable}
                onChange={(e) => {
                  setOnlyAvailable(e.target.checked);
                  setTimeout(applyFilters, 0);
                }}
              />
              <label className="form-check-label" htmlFor="showOnlyAvailable">
                Show only available rides
              </label>
            </div>
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
                    onClick={() => handleSortChange("price-low")}
                  >
                    Price: Low to High
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSortChange("price-high")}
                  >
                    Price: High to Low
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSortChange("departure-early")}
                  >
                    Departure: Earliest
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleSortChange("departure-late")}
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
            // Create badge for frequency
            const frequencyBadge =
              ride.frequency === "Daily" ? (
                <span className="badge bg-primary me-2">Daily</span>
              ) : (
                <span className="badge bg-success me-2">Monthly</span>
              );

            // Create badge for vehicle type
            const vehicleBadge =
              ride.vehicleType === "Car" ? (
                <span className="badge bg-info me-2">Car</span>
              ) : (
                <span className="badge bg-warning text-dark me-2">Bike</span>
              );

            // Format days available
            const daysAvailable = ride.daysAvailable.join(", ");

            // Format preferences
            const preferences = [];
            if (ride.vehicleType === "Car") {
              if (ride.preferences.ac)
                preferences.push(
                  <div key="ac" className="me-3 mb-1 small">
                    <i className="fas fa-snowflake text-primary me-1"></i> AC
                  </div>
                );
              if (ride.preferences.petsAllowed)
                preferences.push(
                  <div key="pets" className="me-3 mb-1 small">
                    <i className="fas fa-paw text-primary me-1"></i> Pets
                    Allowed
                  </div>
                );
              if (ride.preferences.smokingAllowed)
                preferences.push(
                  <div key="smoking" className="me-3 mb-1 small">
                    <i className="fas fa-smoking text-primary me-1"></i> Smoking
                    Allowed
                  </div>
                );
              if (ride.preferences.music)
                preferences.push(
                  <div key="music" className="me-3 mb-1 small">
                    <i className="fas fa-music text-primary me-1"></i> Music
                  </div>
                );
            } else {
              if (ride.preferences.helmetProvided)
                preferences.push(
                  <div key="helmet" className="me-3 mb-1 small">
                    <i className="fas fa-hard-hat text-primary me-1"></i> Helmet
                    Provided
                  </div>
                );
              if (ride.preferences.rainGearAvailable)
                preferences.push(
                  <div key="rain" className="me-3 mb-1 small">
                    <i className="fas fa-cloud-rain text-primary me-1"></i> Rain
                    Gear
                  </div>
                );
            }

            // Format price display
            const priceDisplay =
              ride.priceType === "Monthly"
                ? `Rs ${ride.price}/month`
                : `Rs ${ride.price}/seat`;

            return (
              <div
                key={ride.id}
                className="card mb-4 ride-card-animated fade-in"
                data-ride-id={ride.id}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="d-flex align-items-center mb-3">
                        <div>
                          <h5 className="mb-0">{ride.riderName}</h5>
                          <div className="text-warning small">
                            {getRatingStars(ride.rating)}{" "}
                            <span className="text-muted">({ride.rating})</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        {frequencyBadge}
                        {vehicleBadge}
                        <span className="badge bg-secondary">
                          {daysAvailable}
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
                            <div className="fw-bold">{ride.endingPoint}</div>
                            {ride.returnTime && (
                              <div className="text-muted small">
                                Return: {formatTime(ride.returnTime)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {ride.stops.length > 0 && (
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
                              ride.vehicleType.toLowerCase() === "car"
                                ? "car"
                                : "motorcycle"
                            } me-2`}
                          ></i>
                          {ride.make} ({ride.color})
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex flex-wrap">{preferences}</div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="text-md-end mt-3 mt-md-0">
                        <div className="bg-light rounded p-3 mb-3">
                          <h5 className="mb-2">{priceDisplay}</h5>
                          <div className="text-muted small mb-2">
                            <i className="fas fa-users me-1"></i>{" "}
                            {ride.seatsAvailable} seat
                            {ride.seatsAvailable > 1 ? "s" : ""} available
                          </div>
                          <div className="text-muted small mb-2">
                            <i className="fas fa-route me-1"></i>{" "}
                            {ride.tripType}
                          </div>
                          <div className="border-top pt-3 mt-3 text-start small">
                            <strong>Contact Info:</strong>
                            <br />
                            <div className="text-muted mb-1">
                              <i className="fas fa-user-check me-1"></i>
                              <strong> Preferred:</strong>{" "}
                              {ride.contactInfo.preferredContact}
                            </div>
                            <div className="text-muted mb-1">
                              <i className="fas fa-phone-alt me-1"></i>
                              <strong> Phone:</strong> {ride.contactInfo.phone}
                            </div>
                            {ride.contactInfo.alternatePhone && (
                              <div className="text-muted mb-1">
                                <i className="fas fa-phone me-1"></i>
                                <strong> Alt:</strong>{" "}
                                {ride.contactInfo.alternatePhone}
                              </div>
                            )}
                            <div className="text-muted">
                              <i className="far fa-envelope me-1"></i>
                              <strong> Email:</strong> {ride.contactInfo.email}
                            </div>
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
