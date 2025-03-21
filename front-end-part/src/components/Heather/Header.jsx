import { Link, NavLink } from "react-router";
import "./Heather.css";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <nav>
      <div className="left-section">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Littlest Pet Shop" />
        </Link>
        <div className="search-container">
          <Link to="/search">
            <input
              type="text"
              placeholder="🔍 Search..."
              className="search-input"
            />
          </Link>
        </div>
      </div>
      <div className="center-menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/pets">
          Pets
        </Link>
      </div>

      <div className="auth-menu">
        {isAuthenticated ? (
          <>
            <Link className="item" to="/create">
              Post
            </Link>
            <Link className="item" to="/profile">
              Profile
            </Link>
            <Link className="item" to="/reserve">
              Reserve
            </Link>
            <Link className="item" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="item" to="/login">
              Login
            </Link>
            <Link className="item" to="/signUp">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
