import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const onStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="headerCine">
      <div className="logo">
        <span className="emoji">🎥</span>
        <Link to="/" className="logoText">
          {"CinePlus".split("").map((char, index) => (
            <span
              key={index}
              className="letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </Link>
      </div>

      <div className="headerLink">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          HOME
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? "navItem active" : "navItem"
              }
            >
              CATALOG
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) =>
                isActive ? "navItem active" : "navItem"
              }
            >
              LIBRARY
            </NavLink>

            {/* Logout'u navItem gibi göstermek için span ile */}
            <span
              onClick={handleLogout}
              className="navItem"
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
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "navItem active" : "navItem"
              }
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "navItem active" : "navItem"
              }
            >
              REGISTER
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
