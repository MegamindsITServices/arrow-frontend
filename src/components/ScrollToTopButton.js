import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          ↑
        </button>
      )}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 50px;
          right: 30px;
          z-index: 1000;
        }
        .scroll-to-top-button {
          background-color: #e0731d;
          border: none;
          color: white;
          padding: 10px 15px;
          font-size: 20px;
          border-radius: 5px;
          cursor: pointer;
        }
        .scroll-to-top-button:hover {
          background-color: #db7f1a;
        }
      `}</style>
    </div>
  );
};

export default ScrollToTopButton;
