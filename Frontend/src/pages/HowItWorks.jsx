import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => (
  <>
    <Navbar />
    <div className="container py-5">
      <h1>How It Works</h1>
      <ol>
        <li><strong>Sign Up:</strong> Create your free account using your NUST email.</li>
        <li><strong>Search or Offer a Ride:</strong> Find available rides or offer your own ride to share with others.</li>
        <li><strong>Connect:</strong> Contact fellow students, coordinate pickup points, and travel together safely.</li>
        <li><strong>Save & Share:</strong> Enjoy affordable commuting while making new friends and helping the environment.</li>
      </ol>
    </div>
    <Footer />
  </>
);

export default HowItWorks; 