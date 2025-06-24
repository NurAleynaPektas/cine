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
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const res = await axios.post(
        "https://connections-api.goit.global/users/signup",
        { name, email, password }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Kayıt başarılı!");
      navigate("/catalog");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Bu e-posta zaten kayıtlı!");
      } else {
        toast.error("Kayıt başarısız!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Kayıt Ol</h2>
      <input
        type="text"
        name="name"
        placeholder="İsim"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="E-posta"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="password"
        name="password"
        placeholder="Şifre"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Kayıt Ol
      </button>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  margin: "50px auto",
  gap: "15px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#e50914",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Register;
