import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa";

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

  return (
    <header className={styles.headerCine}>
      <div className={styles.logo}>
        <span className="emoji">🎥</span>
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
        {/* Yatay Menü - sadece PC görünümünde aktif olacak */}
        <div className={styles.headerLink}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            HOME
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                CATALOG
              </NavLink>
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                LIBRARY
              </NavLink>
              <span
                onClick={handleLogout}
                className={styles.navItem}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  backgroundColor: "#e50914",
                }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleLogout();
                }}
              >
                LOGOUT
              </span>
            </>
          )}
        </div>

        {/* Hamburger butonu - sadece mobilde aktif olacak */}
        {token && (
          <div
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
        )}

        {/* Kullanıcı ikonu */}
        {!token && (
          <span
            className={styles.userIcon}
            onClick={() => navigate("/login")}
            title="Login/Register"
          >
            <FaUser color="white" size={24} />
          </span>
        )}
      </div>

      {/* Mobil menü */}
      {token && isMenuOpen && (
        <div className={styles.dropdownMenu}>
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
            className={styles.navItem}
            style={{
              backgroundColor: "#e50914",
              cursor: "pointer",
            }}
          >
            LOGOUT
          </span>
        </div>
      )}
    </header>
  );
}
