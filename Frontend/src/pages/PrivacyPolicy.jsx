import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => (
  <>
    <Navbar />
    <div className="container py-5">
      <h1>Privacy Policy</h1>
      <p>
        RideTogether values your privacy. We only collect information necessary to provide our services and do not share your personal data with third parties without your consent. Your data is protected and used solely for the purpose of improving your experience on our platform.
      </p>
      <p>
        For questions about our privacy practices, please contact us at support@ridetogether.edu.pk.
      </p>
    </div>
    <Footer />
  </>
);

export default PrivacyPolicy; 