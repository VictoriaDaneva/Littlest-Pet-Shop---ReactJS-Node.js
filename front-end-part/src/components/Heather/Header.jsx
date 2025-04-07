import { Link, NavLink, useNavigate } from "react-router";
import "./Heather.css";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="left-section">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Littlest Pet Shop" />
        </Link>
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`menu-container ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="center-menu">
          <Link
            className="item"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="item"
            to="/pets"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pets
          </Link>
        </div>

        <div className="auth-menu">
          {isAuthenticated ? (
            <>
              <Link
                className="item"
                to="/create"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Post
              </Link>
              <Link
                className="item"
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                className="item"
                to="/reserve"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve
              </Link>
              <Link
                className="item"
                to="/logout"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                className="item"
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="item"
                to="/signUp"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
