import React from "react";
import FlipCard from "./FlipCard";

const FaqSection = () => {
  const faqCards = [
    {
      icon: "fa-question-circle",
      title: "How do I book a ride?",
      content: {
        title: "Booking Steps",
        list: [
          "Enter your route details and search",
          "Browse available rides matching your criteria",
          "Select a ride and send a booking request",
          "Wait for driver confirmation (usually within 24 hours)",
          "Once confirmed, you'll get contact details and meeting point",
        ],
      },
      delay: 100,
    },
    {
      icon: "fa-ban",
      title: "Cancellation Policy",
      content: {
        title: "Cancellation Policy",
        text: "Free cancellations up to 3 hours before departure. Last-minute cancellations may result in a small fee to compensate the driver for lost opportunity.",
      },
      delay: 200,
    },
    {
      icon: "fa-money-bill-wave",
      title: "How much does it cost?",
      content: {
        title: "Cost Information",
        text: "Prices are set by drivers but average 50-75% less than taxis. Most rides within Islamabad/Rawalpindi range from Rs. 200-400 depending on distance.",
      },
      delay: 300,
    },
    {
      icon: "fa-shield-alt",
      title: "Is RideTogether safe?",
      content: {
        title: "Safety Features",
        text: "Absolutely! All users must verify their NUST student ID. We also have a rating system and emergency support available 24/7 during active rides.",
      },
      delay: 400,
    },
    {
      icon: "fa-car-crash",
      title: "What about insurance?",
      content: {
        title: "Insurance Coverage",
        text: "Drivers must have valid vehicle insurance. For added peace of mind, RideTogether provides complementary ride protection for all verified trips.",
      },
      delay: 500,
    },
    {
      icon: "fa-mobile-alt",
      title: "Is there a mobile app?",
      content: {
        title: "Mobile App Availability",
        text: "Our mobile app is not available yet, but we're actively working on it to bring you real-time ride tracking, instant notifications, and quick booking soon!",
      },
      delay: 600,
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5" data-aos="fade-up">
          Frequently Asked Questions
        </h2>

        <div className="row g-4 mb-4">
          {faqCards.slice(0, 3).map((card, index) => (
            <div className="col-lg-4" key={index}>
              <FlipCard
                icon={card.icon}
                title={card.title}
                content={card.content}
                delay={card.delay}
              />
            </div>
          ))}
        </div>

        <div className="row g-4">
          {faqCards.slice(3).map((card, index) => (
            <div className="col-lg-4" key={index + 3}>
              <FlipCard
                icon={card.icon}
                title={card.title}
                content={card.content}
                delay={card.delay}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
