import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ScrollToTop from "./assets/pages/ScrollUp";
import Home from "./assets/pages/Home";
import Catalog from "./assets/pages/Catalog";
import Library from "./assets/pages/Library";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold",
        textShadow: `1px 1px 3px rgba(229, 9, 20, 0.8), 
               -1px 1px 3px rgba(229, 9, 20, 0.8), 
               1px -1px 2px rgba(229, 9, 20, 0.8), 
               -1px -1px 3px rgba(229, 9, 20, 0.8)`,
      }}
    >
      <div className="spinner"></div>
      <p style={{ marginTop: "20px" }}>Loading CinePlus...</p>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ScrollToTop />
      <header className="headerCine">
        <div className="logo">
          <span className="emoji">🎥</span>
          <span className="logoText">
            {"CinePlus".split("").map((char, index) => (
              <span
                key={index}
                className="letter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </span>
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
        </div>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
