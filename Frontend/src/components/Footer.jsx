import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark text-white footer-animated">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5>
              <i className="fas fa-car-side me-2"></i> RideTogether
            </h5>
            <p className="text-muted">
              Connecting NUST students for smarter, affordable, and eco-friendly
              commuting.
            </p>
            <div className="social-links mt-3">
              <a href="#" className="text-white me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h6>Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/search" className="text-white">
                  Search Rides
                </Link>
              </li>
              <li>
                <Link to="/post" className="text-white">
                  Offer a Ride
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 col-6">
            <h6>Resources</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/help" className="text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h6>Contact Us</h6>
            <ul className="list-unstyled footer-links">
              <li className="text-white">
                <i className="fas fa-envelope me-2"></i>{" "}
                support@ridetogether.edu.pk
              </li>
              <li className="text-white">
                <i className="fas fa-phone me-2"></i> +92 51 1234 5678
              </li>
              <li className="text-white">
                <i className="fas fa-map-marker-alt me-2"></i> NUST Campus,
                H-12, Islamabad
              </li>
            </ul>
            <div className="mt-3">
              <select className="form-select form-select-sm bg-dark text-white border-secondary">
                <option selected>English</option>
                <option>Urdu</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="text-center text-white">
          <small>
            &copy; 2023 RideTogether. All rights reserved. Built for NUST
            community.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
