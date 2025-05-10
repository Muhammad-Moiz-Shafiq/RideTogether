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
  const [rideToDelete, setRideToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  // Fetch all rides
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const data = await rideService.getAllRides();
        setRides(data);
        setError(null);
      } catch (err) {
        setError("Failed to load rides. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
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
      await rideService.deleteRide(rideToDelete);
      setRides((prevRides) =>
        prevRides.filter((ride) => ride._id !== rideToDelete)
      );
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

  // Get filtered rides
  const getFilteredRides = () => {
    return rides.filter((ride) => {
      // Apply status filter
      if (filterStatus !== "all" && ride.status !== filterStatus) {
        return false;
      }

      // Apply search term filter
      if (searchTerm.trim() !== "") {
        const searchLower = searchTerm.toLowerCase();
        return (
          ride.startingPoint.toLowerCase().includes(searchLower) ||
          ride.destination.toLowerCase().includes(searchLower) ||
          ride.userName.toLowerCase().includes(searchLower) ||
          ride.studentId.toLowerCase().includes(searchLower)
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

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <i className="fas fa-car-side me-2"></i>
              Manage Rides
            </h4>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
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
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Rides</option>
                  <option value="completed">Completed Rides</option>
                  <option value="cancelled">Cancelled Rides</option>
                </select>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRides.map((ride) => (
                      <tr key={ride._id}>
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
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(ride._id)}
                              title="Delete Ride"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate(`/edit-ride/${ride._id}`)}
                              title="Edit Ride"
                            >
                              <i className="fas fa-edit"></i>
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

export default AdminDashboard;
