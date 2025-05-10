import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState({});
  const [formStatus, setFormStatus] = useState(null); // success or error message

  // Function to validate NUST email
  const isValidNUSTEmail = (email) => {
    // Check if it's a valid email and ends with edu.pk
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      emailRegex.test(email) &&
      (email.endsWith("seecs.edu.pk") || email.endsWith("edu.pk"))
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error when user starts typing
    if (formErrors[id]) {
      const newErrors = { ...formErrors };
      delete newErrors[id];
      setFormErrors(newErrors);
    }

    // Perform real-time validation for email
    if (id === "email" && value.trim() !== "") {
      if (!isValidNUSTEmail(value.trim())) {
        setFormErrors({
          ...formErrors,
          email: "Please enter a valid NUST email address.",
        });
        setFormValid({ ...formValid, email: false });
      } else {
        const newErrors = { ...formErrors };
        delete newErrors.email;
        setFormErrors(newErrors);
        setFormValid({ ...formValid, email: true });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = {};
    const valid = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    } else {
      valid.fullName = true;
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!isValidNUSTEmail(formData.email.trim())) {
      errors.email = "Please enter a valid NUST email address.";
    } else {
      valid.email = true;
    }

    if (!formData.subject) {
      errors.subject = "Please select a subject.";
    } else {
      valid.subject = true;
    }

    if (!formData.message.trim()) {
      errors.message = "Please enter your message.";
    } else {
      valid.message = true;
    }

    setFormErrors(errors);
    setFormValid(valid);

    // If no errors, submit form
    if (Object.keys(errors).length === 0) {
      try {
        setFormStatus(null);
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            subject: formData.subject,
            phone: formData.phone,
            message: formData.message,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setFormStatus({ type: "success", message: data.message || "Your message has been sent successfully." });
          setFormData({
            fullName: "",
            email: "",
            subject: "",
            phone: "",
            message: "",
          });
          setFormValid({});
        } else {
          setFormStatus({ type: "error", message: data.error || "Failed to send your message. Please try again later." });
        }
      } catch (error) {
        setFormStatus({ type: "error", message: "Failed to send your message. Please try again later." });
      }
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 className="mb-3" data-aos="fade-up">
                Contact Us
              </h2>
              <p className="text-muted" data-aos="fade-up" data-aos-delay="100">
                Have a specific question or concern? Reach out to our support
                team.
              </p>
            </div>

            <div
              className="card shadow-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card-body p-4">
                {formStatus && (
                  <div className={`alert alert-${formStatus.type === "success" ? "success" : "danger"} mb-3`}>
                    {formStatus.message}
                  </div>
                )}
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formErrors.fullName ? "is-invalid" : ""
                        } ${formValid.fullName ? "is-valid" : ""}`}
                        id="fullName"
                        required
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {formErrors.fullName && (
                        <div className="invalid-feedback">
                          {formErrors.fullName}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">NUST Email</label>
                      <input
                        type="email"
                        className={`form-control ${
                          formErrors.email ? "is-invalid" : ""
                        } ${formValid.email ? "is-valid" : ""}`}
                        id="email"
                        required
                        placeholder="Enter your NUST email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Subject</label>
                      <select
                        className={`form-select ${
                          formErrors.subject ? "is-invalid" : ""
                        } ${formValid.subject ? "is-valid" : ""}`}
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a topic</option>
                        <option>Booking Issue</option>
                        <option>Account Problem</option>
                        <option>Payment Query</option>
                        <option>Safety Concern</option>
                        <option>Other</option>
                      </select>
                      {formErrors.subject && (
                        <div className="invalid-feedback">
                          {formErrors.subject}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone (Optional)</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea
                        className={`form-control ${
                          formErrors.message ? "is-invalid" : ""
                        } ${formValid.message ? "is-valid" : ""}`}
                        id="message"
                        rows="5"
                        required
                        placeholder="Describe your issue or question"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {formErrors.message && (
                        <div className="invalid-feedback">
                          {formErrors.message}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                      >
                        <i className="fas fa-paper-plane me-2"></i> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
