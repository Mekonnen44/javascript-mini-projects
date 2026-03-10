import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ username, password });

      alert("Account created!");

      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;
