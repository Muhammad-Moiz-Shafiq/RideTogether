// components/AuthCard.jsx
import React from "react";

const AuthCard = ({ children, additionalClasses = "" }) => {
  return (
    <div className={`auth-content-wrapper ${additionalClasses}`}>
      <div className="login-container">
        <div className="logo text-center">
          <div className="navbar-brand mx-auto">
            <i className="fas fa-car-side text-primary me-2"></i>
            <strong>RideTogether</strong>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
