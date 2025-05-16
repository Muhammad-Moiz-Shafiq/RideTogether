import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const SafetyGuidelines = () => (
  <>
    <Navbar />
    {/* Hero Section */}
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <i className="fas fa-shield-alt fa-3x mb-3"></i>
            <h1 className="display-4 fw-bold mb-3">Safety Guidelines</h1>
            <p className="lead mb-0">Your safety is our top priority. Follow these guidelines to ensure a secure ride-sharing experience.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Safety Tips Card Section */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 className="text-center mb-4 text-primary">Safety Tips</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border-0 p-3">
                  <i className="fas fa-id-card fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Verify Identity</h3>
                  <p>Always verify the identity of your ride partner before the trip.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border-0 p-3">
                  <i className="fas fa-share-alt fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Share Ride Details</h3>
                  <p>Share your ride details with a trusted friend or family member.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border-0 p-3">
                  <i className="fas fa-map-marker-alt fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Meet in Public</h3>
                  <p>Meet in public, well-lit areas for pickups and drop-offs.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border-0 p-3">
                  <i className="fas fa-traffic-light fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Follow Traffic Rules</h3>
                  <p>Follow all traffic rules and respect your fellow riders.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow border-0 p-3">
                  <i className="fas fa-flag fa-2x mb-3 text-primary"></i>
                  <h3 className="h5 mb-2">Report Suspicious Activity</h3>
                  <p>Report any suspicious activity to RideTogether support.</p>
                </div>
              </div>
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
            <h2 className="mb-3">Questions or Concerns?</h2>
            <p className="lead mb-4">If you have any questions or need further assistance, please visit our Help Centre.</p>
            <Link to="/help" className="btn btn-light btn-lg">Visit Help Centre</Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default SafetyGuidelines; 