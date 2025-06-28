"use client";
import React, { useState, useEffect } from "react";
import "./ScrollToTopButtonCSS.css";
import UpArrowIcon from "./arrowUpSolid.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <p onClick={scrollToTop}>
          <img
            className="scroll-to-top-btn"
            src={UpArrowIcon}
            alt="Scroll to top"

          />
        </p>
      )}
    </>
  );
};

export default ScrollToTopButton;
