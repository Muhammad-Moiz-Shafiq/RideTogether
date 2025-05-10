import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rideService from "../services/rideService";
import authService from "../services/authService";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rideToDelete, setRideToDelete] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch user's rides
  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        setLoading(true);
        const data = await rideService.getMyRides();
        setRides(data);
        setError(null);
      } catch (err) {
        setError("Failed to load your rides. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRides();
  }, []);

  // Handle delete confirmation
  const confirmDelete = (rideId) => {
    setRideToDelete(rideId);
    setShowDeleteModal(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!rideToDelete) {
      setError("No ride selected for deletion");
      setShowDeleteModal(false);
      return;
    }

    try {
      setError(null);
      // Don't close modal yet - show loading state

      // Try to delete the ride
      await rideService.deleteRide(rideToDelete);

      // If successful, update the UI
      setRides((prevRides) =>
        prevRides.filter((ride) => ride._id !== rideToDelete)
      );

      // Reset state
      setRideToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error in handleDelete:", err);
      setError(err.message || "Failed to delete ride. Please try again.");
      setShowDeleteModal(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-success";
      case "completed":
        return "bg-secondary";
      case "cancelled":
        return "bg-danger";
      default:
        return "bg-primary";
    }
  };

  return (
    <>
      <Navbar />
      <main className="fade-in">
        {loading ? (
          <div className="container py-5">
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your rides...</p>
            </div>
          </div>
        ) : (
          <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>My Rides</h1>
              <Link to="/post" className="btn btn-primary">
                <i className="fas fa-plus-circle me-2"></i>
                Post a New Ride
              </Link>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {rides.length === 0 ? (
              <div className="card shadow-sm p-4 text-center">
                <div className="py-5">
                  <i className="fas fa-car-side fa-4x mb-3 text-muted"></i>
                  <h3>No Rides Found</h3>
                  <p className="text-muted">
                    You haven't posted any rides yet. Start sharing rides with
                    others at NUST!
                  </p>
                  <Link to="/post" className="btn btn-primary mt-3">
                    Post Your First Ride
                  </Link>
                </div>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {rides.map((ride) => (
                  <div key={ride._id} className="col">
                    <div className="card h-100 shadow-sm hover-shadow">
                      <div className="card-header bg-light">
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title mb-0">
                            {ride.startingPoint} → {ride.destination}
                          </h5>
                          <span
                            className={`badge ${getStatusBadgeClass(
                              ride.status
                            )}`}
                          >
                            {ride.status.charAt(0).toUpperCase() +
                              ride.status.slice(1)}
                          </span>
                        </div>
                        <small className="text-muted">
                          Posted on {formatDate(ride.createdAt)}
                        </small>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-6">
                            <small className="text-muted d-block">
                              Departure
                            </small>
                            <span>{ride.departureTime}</span>
                          </div>
                          {ride.tripType === "round-trip" && (
                            <div className="col-6">
                              <small className="text-muted d-block">
                                Return
                              </small>
                              <span>{ride.returnTime}</span>
                            </div>
                          )}
                        </div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <small className="text-muted d-block">
                              Vehicle
                            </small>
                            <span className="text-capitalize">
                              {ride.vehicleType} • {ride.vehicleDetails}
                            </span>
                          </div>
                          <div className="col-6">
                            <small className="text-muted d-block">Price</small>
                            <span>Rs. {ride.price}</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted d-block">
                            Frequency
                          </small>
                          <span className="text-capitalize">
                            {ride.rideFrequency}
                          </span>
                          {ride.rideFrequency !== "one-time" && (
                            <small className="d-block mt-1">
                              {ride.daysAvailable.join(", ")}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="card-footer bg-white border-top">
                        <div className="d-flex gap-2">
                          <Link
                            to={`/edit-ride/${ride._id}`}
                            className="btn btn-outline-primary flex-fill"
                          >
                            <i className="fas fa-edit me-1"></i> Edit
                          </Link>
                          <button
                            onClick={() => confirmDelete(ride._id)}
                            className="btn btn-outline-danger flex-fill"
                          >
                            <i className="fas fa-trash-alt me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Ride"
          message="Are you sure you want to delete this ride? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setRideToDelete(null);
          }}
          confirmButtonClass="btn-danger"
        />
      )}
    </>
  );
};

export default MyRides;
