import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <>
    <Navbar />
    {/* Hero Section */}
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <i className="fas fa-shield-alt fa-3x mb-3"></i>
            <h1 className="display-4 fw-bold mb-3">Privacy Policy</h1>
            <p className="lead mb-0">Learn how we protect and handle your personal information.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Privacy Content */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow border-0 p-4">
              <h2 className="mb-3 text-primary">Information We Collect</h2>
              <p>
                At RideTogether, we collect and process information necessary to provide our ride-sharing services. This includes:
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-user text-primary me-2"></i> Basic profile information (name, NUST email, profile picture)</li>
                <li className="mb-2"><i className="fas fa-map-marker-alt text-primary me-2"></i> Location data for ride matching</li>
                <li className="mb-2"><i className="fas fa-history text-primary me-2"></i> Ride history and preferences</li>
                <li className="mb-2"><i className="fas fa-comments text-primary me-2"></i> Communication data between users</li>
              </ul>

              <h3 className="mt-4 mb-2 text-secondary">How We Use Your Information</h3>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> To provide and improve our ride-sharing services</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> To ensure platform safety and security</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> To communicate important updates and notifications</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> To analyze and enhance user experience</li>
              </ul>

              <h3 className="mt-4 mb-2 text-secondary">Data Protection</h3>
              <p>
                We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely. We never share your personal information with third parties without your consent, except as required by law.
              </p>

              <h3 className="mt-4 mb-2 text-secondary">Your Rights</h3>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-user-shield text-primary me-2"></i> Access and update your personal information</li>
                <li className="mb-2"><i className="fas fa-trash-alt text-primary me-2"></i> Request deletion of your account and data</li>
                <li className="mb-2"><i className="fas fa-eye-slash text-primary me-2"></i> Opt-out of non-essential communications</li>
                <li className="mb-2"><i className="fas fa-file-export text-primary me-2"></i> Export your data</li>
              </ul>

              <h3 className="mt-4 mb-2 text-secondary">Updates to Privacy Policy</h3>
              <p>
                We may update this privacy policy from time to time. We will notify you of any significant changes through the platform or via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-5 bg-secondary text-white text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-3">Questions About Privacy?</h2>
            <p className="lead mb-4">If you have any questions about our privacy practices or your data, please visit our Help Centre.</p>
            <Link to="/help" className="btn btn-light btn-lg">Visit Help Centre</Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default PrivacyPolicy; 