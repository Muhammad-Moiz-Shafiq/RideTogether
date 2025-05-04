import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AuthLayout = ({ children }) => {
  // Scroll to top button functionality
  useEffect(() => {
    const scrollFunction = () => {
      const scrollTopBtn = document.getElementById("scrollTopBtn");
      if (!scrollTopBtn) return;

      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };

    const scrollToTop = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    // Add event listeners on mount
    window.addEventListener("scroll", scrollFunction);
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener("click", scrollToTop);
    }

    // Clean up on unmount
    return () => {
      window.removeEventListener("scroll", scrollFunction);
      if (scrollTopBtn) {
        scrollTopBtn.removeEventListener("click", scrollToTop);
      }
    };
  }, []);

  return (
    <div className="login-signup-body">
      <Navbar />

      {children}

      <Footer />

      {/* Scroll to Top Button */}
      <div
        id="scrollTopBtn"
        style={{
          display: "none",
          position: "fixed",
          bottom: "20px",
          right: "30px",
          zIndex: 99,
          fontSize: "18px",
          border: "none",
          outline: "none",
          backgroundColor: "#0066CC",
          color: "white",
          cursor: "pointer",
          padding: "15px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
};

export default AuthLayout;
