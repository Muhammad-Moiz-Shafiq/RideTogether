import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Create the button element
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
      scrollBtn.innerHTML = `<i class="fas fa-chevron-up"></i>`;
      scrollBtn.style.position = "fixed";
      scrollBtn.style.bottom = "20px";
      scrollBtn.style.right = "20px";
      scrollBtn.style.width = "40px";
      scrollBtn.style.height = "40px";
      scrollBtn.style.borderRadius = "50%";
      scrollBtn.style.backgroundColor = "var(--primary)";
      scrollBtn.style.color = "white";
      scrollBtn.style.display = "flex";
      scrollBtn.style.justifyContent = "center";
      scrollBtn.style.alignItems = "center";
      scrollBtn.style.cursor = "pointer";
      scrollBtn.style.zIndex = "999";
      scrollBtn.style.opacity = "0";
      scrollBtn.style.transform = "translateY(20px)";
      scrollBtn.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      scrollBtn.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    }

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Update button visibility when isVisible state changes
  useEffect(() => {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
      if (isVisible) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.transform = "translateY(0)";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.transform = "translateY(20px)";
      }
    }
  }, [isVisible]);

  return (
    <div
      id="scrollTopBtn"
      onClick={scrollToTop}
      className="pulse-animation"
    ></div>
  );
};

export default ScrollToTop;
