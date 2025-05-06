import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Home/HeroSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import StatisticsSection from "../components/Home/StatisticsSection";
import OfferRideSection from "../components/Home/OfferRideSection";
import PopularRoutesSection from "../components/Home/PopularRoutesSection";
import FaqSection from "../components/Home/FaqSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    // Initialize AOS library
    if (typeof Aos !== "undefined") {
      Aos.init({
        duration: 1000,
        once: true,
      });
    }

    // Initialize counter animation
    const counterElements = document.querySelectorAll(".counter-value");
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000; // Animation duration in milliseconds
      const step = Math.ceil(target / (duration / 30)); // Update every 30ms
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;
          setTimeout(updateCounter, 30);
        }
      };

      updateCounter();
    });

    // Initialize GSAP animations
    if (typeof gsap !== "undefined") {
      gsap.from(".parallax-element", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }

    // Car path animation
    const routePaths = document.querySelectorAll(".route-path-animation");
    routePaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      setTimeout(() => {
        path.style.transition = "stroke-dashoffset 2s ease-in-out";
        path.style.strokeDashoffset = "0";
      }, 1000);
    });

    // Parallax effect
    const handleMouseMove = (e) => {
      const parallaxElements = document.querySelectorAll(".parallax-element");
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || 0.1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <OfferRideSection />
      <PopularRoutesSection />
      <FaqSection />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
