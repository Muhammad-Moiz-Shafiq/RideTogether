import React, { useEffect } from "react";
import HeroSection from "../components/HelpCenter/HeroSection";
import FaqSection from "../components/HelpCenter/FaqSection";
import ContactForm from "../components/HelpCenter/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import AOS library for animations
import AOS from "aos";
import "aos/dist/aos.css";

const HelpCenter = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FaqSection />
      <ContactForm />
      <Footer />
    </>
  );
};

export default HelpCenter;
