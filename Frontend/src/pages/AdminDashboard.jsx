import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import rideService from "../services/rideService";
import authService from "../services/authService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showModerateModal, setShowModerateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [rideToDelete, setRideToDelete] = useState(null);
  const [rideToModerate, setRideToModerate] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [flagReason, setFlagReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [moderationStatus, setModerationStatus] = useState("approved");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFlagged, setShowFlagged] = useState(false);
  const [moderationFilter, setModerationFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");

  // Check if user is admin
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!user.isAdmin) {
      navigate("/");
      return;
    }
  }, [navigate]);

  // Fetch all rides for admin
  const fetchRides = async () => {
    try {
      setLoading(true);
      const data = await rideService.getAdminRides();
      setRides(data);
      setError(null);
    } catch (err) {
      setError("Failed to load rides. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  // Show success message temporarily
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle delete confirmation
  const confirmDelete = (rideId) => {
    setRideToDelete(rideId);
    setShowDeleteModal(true);
  };

  // View ride details
  const viewRideDetails = (ride) => {
    setSelectedRide(ride);
    setShowDetailsModal(true);
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
      await rideService.adminDeleteRide(rideToDelete);
      setRides((prevRides) =>
        prevRides.filter((ride) => ride._id !== rideToDelete)
      );
      setSuccessMessage("Ride deleted successfully");
      setRideToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error in handleDelete:", err);
      setError(err.message || "Failed to delete ride. Please try again.");
      setShowDeleteModal(false);
    }
  };

  // Handle flag ride
  const openFlagModal = (ride) => {
    setRideToModerate(ride);
    setFlagReason("");
    setShowFlagModal(true);
  };

  const handleFlagRide = async () => {
    if (!rideToModerate || !flagReason) {
      setError("Please provide a reason for flagging this ride");
      return;
    }

    try {
      setError(null);
      console.log(
        "Flagging ride:",
        rideToModerate._id,
        "with reason:",
        flagReason
      );

      const updatedRide = await rideService.flagRide(
        rideToModerate._id,
        flagReason
      );

      console.log("Flag response:", updatedRide);

      // Update the ride in the state with the one returned from the API
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === updatedRide._id ? updatedRide : ride
        )
      );

      setSuccessMessage("Ride flagged successfully");
      setShowFlagModal(false);
      setRideToModerate(null);
      setFlagReason("");

      // Refresh rides data to ensure flags are properly displayed
      fetchRides();
    } catch (err) {
      console.error("Error flagging ride:", err);
      setError(err.message || "Failed to flag ride. Please try again.");
    }
  };

  // Handle moderate ride
  const openModerateModal = (ride) => {
    setRideToModerate(ride);
    setModerationStatus(ride.moderationStatus);
    setAdminNotes(ride.adminNotes || "");
    setShowModerateModal(true);
  };

  const handleModerateRide = async () => {
    if (!rideToModerate) {
      setError("No ride selected for moderation");
      return;
    }

    try {
      setError(null);
      const moderationData = {
        moderationStatus,
        adminNotes,
      };

      const updatedRide = await rideService.moderateRide(
        rideToModerate._id,
        moderationData
      );

      // Update the ride in the state
      setRides((prevRides) =>
        prevRides.map((ride) =>
          ride._id === updatedRide._id ? updatedRide : ride
        )
      );

      setSuccessMessage(
        `Ride moderation status updated to: ${moderationStatus}`
      );
      setShowModerateModal(false);
      setRideToModerate(null);

      // Refresh rides data
      fetchRides();
    } catch (err) {
      setError(err.message || "Failed to moderate ride. Please try again.");
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

  // Get filtered rides
  const getFilteredRides = () => {
    return rides.filter((ride) => {
      // Apply flagged filter
      if (showFlagged && !ride.isFlagged) {
        return false;
      }

      // Apply moderation status filter
      if (
        moderationFilter !== "all" &&
        ride.moderationStatus !== moderationFilter
      ) {
        return false;
      }

      // Apply ride status filter
      if (filterStatus !== "all" && ride.status !== filterStatus) {
        return false;
      }

      // Apply search term filter
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        return (
          ride.startingPoint?.toLowerCase().includes(searchLower) ||
          ride.destination?.toLowerCase().includes(searchLower) ||
          ride.userName?.toLowerCase().includes(searchLower) ||
          ride.studentId?.toLowerCase().includes(searchLower)
        );
      }

      return true;
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

  // Get moderation status badge class
  const getModerationBadgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  const filteredRides = getFilteredRides();

  return (
    <>
      <Navbar />
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Dashboard</h1>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/profile")}
            >
              <i className="fas fa-user me-2"></i>
              View Profile
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            {successMessage}
          </div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <i className="fas fa-car-side me-2"></i>
              Manage Rides
            </h4>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by location, name, or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  aria-label="Filter by ride status"
                >
                  <option value="all">All Ride Statuses</option>
                  <option value="active">Active Rides</option>
                  <option value="completed">Completed Rides</option>
                  <option value="cancelled">Cancelled Rides</option>
                </select>
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <select
                  className="form-select"
                  value={moderationFilter}
                  onChange={(e) => setModerationFilter(e.target.value)}
                  aria-label="Filter by moderation status"
                >
                  <option value="all">All Moderation Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="col-md-2">
                <div className="form-check form-switch mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flaggedSwitch"
                    checked={showFlagged}
                    onChange={() => setShowFlagged(!showFlagged)}
                  />
                  <label className="form-check-label" htmlFor="flaggedSwitch">
                    Flagged Only
                  </label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading rides...</p>
              </div>
            ) : filteredRides.length === 0 ? (
              <div className="text-center p-5">
                <i className="fas fa-car-side fa-3x text-muted mb-3"></i>
                <h3>No Rides Found</h3>
                <p className="text-muted">
                  No rides match your current filters.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Route</th>
                      <th>Posted By</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Moderation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRides.map((ride) => (
                      <tr
                        key={ride._id}
                        className={ride.isFlagged ? "table-warning" : ""}
                      >
                        <td>
                          <div className="fw-bold">
                            {ride.startingPoint} → {ride.destination}
                          </div>
                          <small className="text-muted">
                            {ride.tripType === "round-trip"
                              ? "Round Trip"
                              : "One Way"}
                          </small>
                        </td>
                        <td>
                          <div>{ride.userName}</div>
                          <small className="text-muted">{ride.studentId}</small>
                        </td>
                        <td>
                          <div>{formatDate(ride.createdAt)}</div>
                          <small className="text-muted">
                            {new Date(ride.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </small>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadgeClass(
                              ride.status
                            )}`}
                          >
                            {ride.status.charAt(0).toUpperCase() +
                              ride.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div>
                            <span
                              className={`badge ${getModerationBadgeClass(
                                ride.moderationStatus
                              )}`}
                            >
                              {ride.moderationStatus.charAt(0).toUpperCase() +
                                ride.moderationStatus.slice(1)}
                            </span>
                            {ride.isFlagged && (
                              <span className="badge bg-warning text-dark ms-1">
                                <i className="fas fa-flag"></i>
                              </span>
                            )}
                          </div>
                          {ride.isFlagged && (
                            <small className="text-danger d-block mt-1">
                              {ride.flagReason}
                            </small>
                          )}
                        </td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => viewRideDetails(ride)}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => openFlagModal(ride)}
                              title="Flag Ride"
                              disabled={ride.isFlagged}
                            >
                              <i className="fas fa-flag"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => openModerateModal(ride)}
                              title="Moderate Ride"
                            >
                              <i className="fas fa-gavel"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(ride._id)}
                              title="Delete Ride"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Delete"
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Ride
              </button>
            </>
          }
        >
          <p>
            Are you sure you want to delete this ride? This action cannot be
            undone.
          </p>
        </Modal>
      )}

      {/* Flag Ride Modal */}
      {showFlagModal && (
        <Modal
          show={showFlagModal}
          onClose={() => setShowFlagModal(false)}
          title="Flag Ride"
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setShowFlagModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-warning"
                onClick={handleFlagRide}
                disabled={!flagReason.trim()}
              >
                Flag Ride
              </button>
            </>
          }
        >
          <div className="mb-3">
            <label htmlFor="flagReason" className="form-label">
              Reason for Flagging
            </label>
            <textarea
              id="flagReason"
              className="form-control"
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              rows="3"
              placeholder="Explain why this ride is being flagged..."
              required
            ></textarea>
          </div>
        </Modal>
      )}

      {/* Moderate Ride Modal */}
      {showModerateModal && (
        <Modal
          show={showModerateModal}
          onClose={() => setShowModerateModal(false)}
          title="Moderate Ride"
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setShowModerateModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleModerateRide}>
                Save Decision
              </button>
            </>
          }
        >
          <div className="mb-3">
            <label htmlFor="moderationStatus" className="form-label">
              Moderation Status
            </label>
            <select
              id="moderationStatus"
              className="form-select"
              value={moderationStatus}
              onChange={(e) => setModerationStatus(e.target.value)}
            >
              <option value="approved">Approve Ride</option>
              <option value="pending">Mark as Pending Review</option>
              <option value="rejected">Reject Ride</option>
            </select>
            <small className="text-muted">
              Note: Rejecting a ride will also set its status to cancelled.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="adminNotes" className="form-label">
              Admin Notes
            </label>
            <textarea
              id="adminNotes"
              className="form-control"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows="3"
              placeholder="Add administrative notes about this ride..."
            ></textarea>
          </div>
        </Modal>
      )}

      {/* Ride Details Modal */}
      {showDetailsModal && selectedRide && (
        <Modal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Ride Details"
          footer={
            <button
              className="btn btn-primary"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          }
        >
          <div className="ride-details">
            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">Route Information</h5>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">From:</div>
                <div className="col-md-8">{selectedRide.startingPoint}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">To:</div>
                <div className="col-md-8">{selectedRide.destination}</div>
              </div>
              {selectedRide.stops && selectedRide.stops.length > 0 && (
                <div className="row mb-2">
                  <div className="col-md-4 fw-bold">Stops:</div>
                  <div className="col-md-8">
                    {selectedRide.stops.join(", ")}
                  </div>
                </div>
              )}
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Trip Type:</div>
                <div className="col-md-8">
                  {selectedRide.tripType === "round-trip"
                    ? "Round Trip"
                    : "One Way"}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Departure:</div>
                <div className="col-md-8">{selectedRide.departureTime}</div>
              </div>
              {selectedRide.tripType === "round-trip" && (
                <div className="row mb-2">
                  <div className="col-md-4 fw-bold">Return:</div>
                  <div className="col-md-8">{selectedRide.returnTime}</div>
                </div>
              )}
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Days Available:</div>
                <div className="col-md-8">
                  {selectedRide.daysAvailable?.join(", ")}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Frequency:</div>
                <div className="col-md-8">{selectedRide.rideFrequency}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Price:</div>
                <div className="col-md-8">{selectedRide.price}</div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">Vehicle Information</h5>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Vehicle Type:</div>
                <div className="col-md-8">{selectedRide.vehicleType}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Vehicle Details:</div>
                <div className="col-md-8">{selectedRide.vehicleDetails}</div>
              </div>
              {selectedRide.passengerCapacity && (
                <div className="row mb-2">
                  <div className="col-md-4 fw-bold">Passenger Capacity:</div>
                  <div className="col-md-8">
                    {selectedRide.passengerCapacity}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">Contact Information</h5>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Name:</div>
                <div className="col-md-8">{selectedRide.userName}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Student ID:</div>
                <div className="col-md-8">{selectedRide.studentId}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Phone:</div>
                <div className="col-md-8">{selectedRide.phoneNumber}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Email:</div>
                <div className="col-md-8">{selectedRide.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-4 fw-bold">Preferred Contact:</div>
                <div className="col-md-8">
                  {selectedRide.preferredContactMethod}
                </div>
              </div>
            </div>

            {selectedRide.adminNotes && (
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Admin Notes</h5>
                <p>{selectedRide.adminNotes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
