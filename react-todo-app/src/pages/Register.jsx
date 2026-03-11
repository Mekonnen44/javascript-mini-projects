import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ username, password });

      toast.success("Account created successfully!");

      navigate("/login");
    } catch {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="auth-card">
      <div>
        <h2>Create account</h2>
        <p className="auth-subtitle">Start organizing your tasks today.</p>
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
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        className="btn btn-primary"
        type="button"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}

export default Register;