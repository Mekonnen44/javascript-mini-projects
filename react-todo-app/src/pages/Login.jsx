import { useState } from "react";
import { loginUser } from "../api/authApi";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });

      setToken(res.data.access);

      toast.success("Login successful!");

      navigate("/");
    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="auth-card">
      <div>
        <h2>Welcome back</h2>
        <p className="auth-subtitle">Log in to access your tasks.</p>
      </div>

      <label className="field">
        <span>Username</span>
        <input
          placeholder="you@example.com"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="btn btn-primary" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;