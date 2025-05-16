import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => (
  <>
    <Navbar />
    {/* Hero Section */}
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <i className="fas fa-file-contract fa-3x mb-3"></i>
            <h1 className="display-4 fw-bold mb-3">Terms of Service</h1>
            <p className="lead mb-0">Please read our terms carefully before using RideTogether.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Terms Content */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow border-0 p-4">
              <h2 className="mb-3 text-primary">Terms and Conditions</h2>
              <p>
                By using RideTogether, you agree to abide by our community guidelines and all applicable laws. RideTogether is not responsible for any disputes or incidents that occur during rides. Users are expected to communicate respectfully and ensure the safety of all participants.
              </p>
              <h3 className="mt-4 mb-2 text-secondary">Community Guidelines</h3>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Treat fellow riders with courtesy and respect.</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Do not engage in any illegal or harmful activities.</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Promptly report any suspicious or inappropriate behavior.</li>
                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> RideTogether reserves the right to suspend or terminate accounts that violate our guidelines.</li>
              </ul>
              <h3 className="mt-4 mb-2 text-secondary">Disclaimer</h3>
              <p>
                RideTogether is provided "as is" and we do not guarantee that the service will be uninterrupted or error-free. We are not liable for any damages arising out of your use of our platform.
              </p>
              <h3 className="mt-4 mb-2 text-secondary">Contact</h3>
              <p>
                For further details or questions regarding our Terms of Service, please contact our support team.
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
            <h2 className="mb-3">Questions?</h2>
            <p className="lead mb-4">If you have any questions or need further assistance, please visit our Help Centre.</p>
            <Link to="/help" className="btn btn-light btn-lg">Visit Help Centre</Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default TermsOfService; 