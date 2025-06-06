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


function App() {
  return (
    <Router>
      <header className="headerCine">
        <div className="logo">
          <FaFilm className="headerIcon" />
          <span className="logoText">CinePlus</span>
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
