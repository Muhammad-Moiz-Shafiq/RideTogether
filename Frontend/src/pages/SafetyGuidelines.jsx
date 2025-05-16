import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SafetyGuidelines = () => (
  <>
    <Navbar />
    <div className="container py-5">
      <h1>Safety Guidelines</h1>
      <ul>
        <li>Always verify the identity of your ride partner before the trip.</li>
        <li>Share your ride details with a trusted friend or family member.</li>
        <li>Meet in public, well-lit areas for pickups and drop-offs.</li>
        <li>Follow all traffic rules and respect your fellow riders.</li>
        <li>Report any suspicious activity to RideTogether support.</li>
      </ul>
    </div>
    <Footer />
  </>
);

export default SafetyGuidelines; 