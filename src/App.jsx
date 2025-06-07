import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./assets/pages/Home";
import Catalog from "./assets/pages/Catalog";
import Library from "./assets/pages/Library";
import "./App.css";
import { FaFilm } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);
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
