import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa";
export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

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
        <div className={styles.headerLink}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            HOME
          </NavLink>

          {token ? (
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
          ) : null}
        </div>

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
    </header>
  );
}
