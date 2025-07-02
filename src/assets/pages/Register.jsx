import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "https://connections-api.goit.global/users/signup",
        { name, email, password }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Successfully registered!");
      navigate("/catalog");
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("This email is already registered!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ borderBottom: "2px solid #e50914" }}>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
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
        Register
      </button>
      <p style={{ fontSize: "14px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#e50914", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </form>
  );
};

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

export default Register;
