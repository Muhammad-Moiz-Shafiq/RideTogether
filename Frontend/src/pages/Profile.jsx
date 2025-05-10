import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import authService from "../services/authService";
import FormInput from "../components/FormInput";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const userData = await authService.getUserProfile();

      if (!userData) {
        throw new Error("Failed to load profile data");
      }

      setUser(userData);

      // Set form fields
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setPhone(userData.phone || "");
      setBio(userData.bio || "");
      setProfilePicture(userData.profilePicture || "");

      setLoading(false);
    } catch (err) {
      console.error("Profile loading error:", err);
      setError(err.message || "Failed to load profile. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.token) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password if entered
    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Create user data object
    const userData = {
      firstName,
      lastName,
      phone,
      bio,
      profilePicture,
    };

    // Only add password if it's provided
    if (password) {
      userData.password = password;
    }

    try {
      setLoading(true);
      const updatedUser = await authService.updateUserProfile(userData);

      if (!updatedUser) {
        throw new Error("Profile update failed");
      }

      setUser(updatedUser);
      setEditMode(false);
      setSuccess("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message || "Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.includes("image")) {
      setError("Please upload an image file");
      return;
    }

    // Restrict file size to 1.5MB to stay safely below the 2MB limit
    if (file.size > 1.5 * 1024 * 1024) {
      setError("Image size should be less than 1.5MB");
      return;
    }

    setImageLoading(true);
    setError("");

    const reader = new FileReader();

    reader.onloadend = () => {
      try {
        setProfilePicture(reader.result);
        setImageLoading(false);
      } catch (err) {
        setError("Failed to process the image");
        setImageLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read image file");
      setImageLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleTryAgain = () => {
    setError("");
    fetchUserProfile();
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h2 className="m-0">Profile</h2>
                {!editMode && !loading && !error && user && (
                  <button
                    className="btn btn-light"
                    onClick={() => setEditMode(true)}
                  >
                    <i className="fas fa-edit me-1"></i> Edit Profile
                  </button>
                )}
              </div>

              {loading ? (
                <div className="card-body text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading profile information...</p>
                </div>
              ) : error ? (
                <div className="card-body text-center p-5">
                  <div className="text-danger mb-3">
                    <i className="fas fa-exclamation-circle fa-3x"></i>
                  </div>
                  <h4>{error}</h4>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleTryAgain}
                  >
                    Try Again
                  </button>
                </div>
              ) : !user ? (
                <div className="card-body text-center p-5">
                  <div className="text-warning mb-3">
                    <i className="fas fa-exclamation-triangle fa-3x"></i>
                  </div>
                  <h4>No profile data available</h4>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => navigate("/login")}
                  >
                    Login Again
                  </button>
                </div>
              ) : (
                <div className="card-body p-4">
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}

                  {!editMode ? (
                    // View Mode
                    <div className="row">
                      <div className="col-md-4 text-center mb-4 mb-md-0">
                        <div className="profile-img-container mb-3">
                          {profilePicture ? (
                            <img
                              src={profilePicture}
                              alt="Profile"
                              className="img-fluid rounded-circle"
                              style={{
                                width: "180px",
                                height: "180px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="d-flex justify-content-center align-items-center bg-light rounded-circle mx-auto"
                              style={{ width: "180px", height: "180px" }}
                            >
                              <i
                                className="fas fa-user-circle"
                                style={{ fontSize: "80px", color: "#00AEEF" }}
                              ></i>
                            </div>
                          )}
                        </div>
                        <h4 className="mb-1">
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className="text-muted mb-3">@{user.username}</p>
                      </div>
                      <div className="col-md-8">
                        <div className="info-section">
                          <h4 className="border-bottom pb-2 mb-3">
                            Basic Information
                          </h4>
                          <div className="row mb-3">
                            <div className="col-sm-4 fw-bold">Email:</div>
                            <div className="col-sm-8">{user.email}</div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-4 fw-bold">Phone:</div>
                            <div className="col-sm-8">
                              {user.phone || "Not provided"}
                            </div>
                          </div>
                          {user.bio && (
                            <div className="mb-3">
                              <h5 className="border-bottom pb-2 mb-3">
                                About Me
                              </h5>
                              <p>{user.bio}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-4 text-center mb-4">
                          <div className="profile-img-container mb-3">
                            {imageLoading ? (
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : profilePicture ? (
                              <img
                                src={profilePicture}
                                alt="Profile"
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "180px",
                                  height: "180px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div
                                className="d-flex justify-content-center align-items-center bg-light rounded-circle mx-auto"
                                style={{ width: "180px", height: "180px" }}
                              >
                                <i
                                  className="fas fa-user-circle"
                                  style={{ fontSize: "80px", color: "#00AEEF" }}
                                ></i>
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="image-upload"
                              className="btn btn-outline-primary"
                            >
                              <i className="fas fa-camera me-2"></i>Upload Photo
                            </label>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="d-none"
                            />
                            {error && error.includes("image") && (
                              <div className="text-danger mt-2 small">
                                {error}
                              </div>
                            )}
                            <div className="mt-1 small text-muted">
                              Max size: 1.5MB
                            </div>
                          </div>
                        </div>

                        <div className="col-md-8">
                          <div className="mb-3">
                            <h4 className="border-bottom pb-2 mb-3">
                              Personal Information
                            </h4>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <FormInput
                                  label="First Name"
                                  type="text"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <FormInput
                                  label="Last Name"
                                  type="text"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mb-3">
                              <FormInput
                                label="Phone Number"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                              />
                            </div>

                            <div className="mb-4">
                              <label className="form-label">Bio</label>
                              <textarea
                                className="form-control"
                                rows="4"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us about yourself"
                                maxLength={500}
                              ></textarea>
                              <small className="text-muted">
                                {bio.length}/500 characters
                              </small>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="border-bottom pb-2 mb-3">
                              Change Password
                            </h4>
                            <div className="mb-3">
                              <FormInput
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current password"
                              />
                            </div>
                            <div className="mb-3">
                              <FormInput
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                disabled={!password}
                              />
                              {error && error.includes("Passwords") && (
                                <div className="text-danger mt-1">{error}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditMode(false);
                            // Reset form to original values
                            setFirstName(user.firstName);
                            setLastName(user.lastName);
                            setPhone(user.phone || "");
                            setBio(user.bio || "");
                            setProfilePicture(user.profilePicture || "");
                            setPassword("");
                            setConfirmPassword("");
                            setError("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
