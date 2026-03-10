import { useState } from "react";
import { loginUser } from "../api/authApi";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });

      setToken(res.data.access);

      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="primary-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
