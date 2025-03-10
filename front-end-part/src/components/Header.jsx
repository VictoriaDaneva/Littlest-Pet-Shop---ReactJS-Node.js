import { Link, NavLink } from "react-router";
const navigation = [
  { name: "Home", path: "/" },
  { name: "Post", path: "/post" },
  { name: "Pets", path: "/pets" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signUp" },
  { name: "Profile", path: "/profile" },
  { name: "Reserve", path: "/reserve" },
  { name: "Logout", path: "Logout" },
];

export default function Header() {
  return (
    <nav>
      <div className="left-section">
        <Link to="/home" className="logo">
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
        {navigation.slice(0, 3).map((item) => (
          <NavLink key={item.name} to={item.path} className="item">
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="auth-menu">
        {navigation.slice(3).map((item) => (
          <NavLink key={item.name} to={item.path} className="item">
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
