import { Link, useNavigate } from "react-router-dom";
import { removeToken, isAuthenticated } from "../utils/auth";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true"></div>
          <h2 className="logo">TaskManager</h2>
        </div>

        <div className="nav-actions">
          {isAuthenticated() ? (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link nav-link-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">{children}</main>
    </div>
  );
}

export default Layout;