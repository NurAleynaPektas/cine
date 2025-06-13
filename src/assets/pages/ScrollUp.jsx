import { useState, useEffect } from "react";
import { GiPopcorn } from "react-icons/gi";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
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

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        padding: "10px",
        fontSize: "24px",
        borderRadius: "50%",
        border: "2px solid rgb(229, 208, 213)", // bordo renk
        backgroundColor: "#b22222", // kırmızımsı bordo
        color: "white",
        cursor: "pointer",
        boxShadow: "0 0 10px 3px rgb(235, 229, 231)",
        animation: "blink 1.5s infinite",
        zIndex: 1000,
      }}
      aria-label="Scroll to top"
      title="Sayfanın üstüne git"
    >
      <GiPopcorn />
    </button>
  );
}

export default ScrollToTop;
