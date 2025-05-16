import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => (
  <>
    <Navbar />
    <div className="container py-5">
      <h1>Terms of Service</h1>
      <p>
        By using RideTogether, you agree to abide by our community guidelines and all applicable laws. RideTogether is not responsible for any disputes or incidents that occur during rides. Users are expected to communicate respectfully and ensure the safety of all participants.
      </p>
      <p>
        For more details, please contact our support team.
      </p>
    </div>
    <Footer />
  </>
);

export default TermsOfService; 