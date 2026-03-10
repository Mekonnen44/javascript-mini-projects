import { Link, useNavigate } from "react-router-dom";
import { removeToken, isAuthenticated } from "../utils/auth";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div>

      <nav className="navbar">
        <h2 className="logo">TaskManager</h2>

        <div>
          {isAuthenticated() ? (
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        {children}
      </main>

    </div>
  );
}

export default Layout;