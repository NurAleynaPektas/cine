import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  // ESC ile menüyü kapatma için (isteğe bağlı)
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  // Yan menü açıkken sayfa scroll kapatma (isteğe bağlı)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.headerCine}>
      <div className={styles.logo}>
        <Link to="/" className={styles.emoji}>
          🎥
        </Link>
        <Link to="/" className={styles.logoText}>
          {"CinePlus".split("").map((char, index) => (
            <span
              key={index}
              className={styles.letter}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </Link>
      </div>

      <div className={styles.rightContainer}>
        {/* HOME HER ZAMAN GÖRÜNÜR */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          HOME
        </NavLink>

        {/* DİĞER LİNKLER SADECE TOKEN VARSA */}
        {token && (
          <div className={styles.headerLink}>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              CATALOG
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              LIBRARY
            </NavLink>
            <span onClick={handleLogout} className={styles.exit}>
              <FiLogOut size={18} />
              EXIT
            </span>
          </div>
        )}

        {/* HAMBURGER */}
        {token && (
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        )}

        {/* USER ICON */}
        {!token && (
          <span
            className={styles.userIcon}
            onClick={() => navigate("/login")}
            title="Login/Register"
          >
            <FaUser color="gray" size={24} />
          </span>
        )}
      </div>

      {/* YAN MENÜ */}
      {token && isMenuOpen && (
        <div
          className={styles.sideMenuOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={styles.sideMenuContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={styles.navItem}
            >
              HOME
            </NavLink>
            <NavLink
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className={styles.navItem}
            >
              CATALOG
            </NavLink>
            <NavLink
              to="/library"
              onClick={() => setIsMenuOpen(false)}
              className={styles.navItem}
            >
              LIBRARY
            </NavLink>
            <span
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className={styles.exit}
            >
              <FiLogOut size={18} />
              EXIT
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
