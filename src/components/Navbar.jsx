import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3 className="logo" onClick={() => navigate("/dashboard")}>
        TaskApp
      </h3>

      <div className="nav-actions">
        {token ? (
          <button className="btn logout-btn" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button className="btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn primary" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
