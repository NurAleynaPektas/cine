import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "https://connections-api.goit.global/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // token değişimini header'a bildirmek için
      window.dispatchEvent(new Event("storage"));

      toast.success("Successfully logged in !");
      navigate("/catalog");
    } catch (error) {
      toast.error("Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ borderBottom: "2px solid #e50914" }}>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Login
      </button>
    </form>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "400px",
  margin: "50px auto",
  gap: "20px",
  border: "1px solid #e50914",
  borderRadius: "12px",
  padding: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "8px",
};

const buttonStyle = {
  width: "100px",
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#e50914",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "8px",
};
