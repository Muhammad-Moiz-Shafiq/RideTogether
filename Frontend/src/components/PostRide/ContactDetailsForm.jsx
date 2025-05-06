import React from "react";

const ContactDetailsForm = ({ formData, handleInputChange }) => {
  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold">
        <span className="badge bg-primary rounded-circle me-2">4</span>
        Contact Details
      </h3>

      {/* User Name - Added Field */}
      <div className="mb-4">
        <label className="form-label">
          Your Name
          <span className="text-danger">*</span>
        </label>
        <div className="input-group mb-2">
          <span className="input-group-text bg-light">
            <i className="fas fa-user text-primary"></i>
          </span>
          <input
            type="text"
            className="form-control"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      {/* Student ID - Added Field */}
      <div className="mb-4">
        <label className="form-label">
          Student/Faculty ID
          <span className="text-danger">*</span>
        </label>
        <div className="input-group mb-2">
          <span className="input-group-text bg-light">
            <i className="fas fa-id-card text-primary"></i>
          </span>
          <input
            type="text"
            className="form-control"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            placeholder="Enter your university ID"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">
          Your Phone Number
          <span className="text-danger">*</span>
        </label>
        <div className="input-group mb-2">
          <span className="input-group-text bg-light">
            <i className="fas fa-phone text-primary"></i>
          </span>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-check ms-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="primaryWhatsapp"
            name="isPrimaryWhatsapp"
            checked={formData.isPrimaryWhatsapp}
            onChange={handleInputChange}
          />
          <label className="form-check-label small" htmlFor="primaryWhatsapp">
            <i className="fab fa-whatsapp text-success me-1"></i>
            This number is on WhatsApp
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Email Address</label>
        <div className="input-group">
          <span className="input-group-text bg-light">
            <i className="fas fa-envelope text-primary"></i>
          </span>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
        </div>
        <small className="text-muted ms-2">
          Preferably your university email
        </small>
      </div>

      <div className="mb-4">
        <label className="form-label">Preferred Contact Method</label>
        <div className="d-flex flex-wrap">
          <div className="form-check me-4 mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="preferredContactMethod"
              id="preferPhone"
              value="phone"
              checked={formData.preferredContactMethod === "phone"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="preferPhone">
              <i className="fas fa-phone me-2 text-primary"></i> Phone Call
            </label>
          </div>
          <div className="form-check me-4 mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="preferredContactMethod"
              id="preferWhatsapp"
              value="whatsapp"
              checked={formData.preferredContactMethod === "whatsapp"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="preferWhatsapp">
              <i className="fab fa-whatsapp me-2 text-primary"></i>
              WhatsApp
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="preferredContactMethod"
              id="preferEmail"
              value="email"
              checked={formData.preferredContactMethod === "email"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="preferEmail">
              <i className="fas fa-envelope me-2 text-primary"></i>
              Email
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="card bg-light border-0">
          <div className="card-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="shareContactConsent"
                name="shareContactConsent"
                checked={formData.shareContactConsent}
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label" htmlFor="shareContactConsent">
                I consent to share my contact details with riders who book my
                ride
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="card bg-light border-0">
          <div className="card-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label" htmlFor="termsAgreed">
                I agree to the
                <a href="#" className="link-primary">
                  {" "}
                  terms and conditions
                </a>
                and
                <a href="#" className="link-primary">
                  {" "}
                  privacy policy
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsForm;
