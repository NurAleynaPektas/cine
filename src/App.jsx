import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/pages/ScrollUp";
import Home from "./assets/pages/Home";
import Catalog from "./assets/pages/Catalog";
import Library from "./assets/pages/Library";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./assets/pages/Footer";
import Register from "./assets/pages/Register";
import PrivateRoute from "./assets/pages/PrivateRoute";
import Login from "./assets/pages/Login";
import Header from "./assets/pages/Header";

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
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
      <ScrollToTop />
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalog"
            element={
              <PrivateRoute>
                <Catalog />
              </PrivateRoute>
            }
          />
          <Route
            path="/library"
            element={
              <PrivateRoute>
                <Library />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
