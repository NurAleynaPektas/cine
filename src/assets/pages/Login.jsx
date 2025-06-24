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
      toast.error("Lütfen tüm alanları doldurun.");
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

      toast.success("Giriş başarılı!");
      navigate("/catalog");
    } catch (error) {
      toast.error("Giriş başarısız! Bilgilerinizi kontrol edin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Login</h2>
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
        Giriş Yap
      </button>
    </form>
  );
}

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
