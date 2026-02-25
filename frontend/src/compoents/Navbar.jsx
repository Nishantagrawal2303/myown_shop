import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyOwnShop</Link>
      </div>

      <div className="navbar-center">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      {!user ? (
        <div className="navbar-auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="user-dropdown" onClick={toggleDropdown}>
          <div className="user-avatar">
            {getUserInitials(user.name)}
          </div>
          <span className="user-name">{user.name}</span>
          <span className="dropdown-arrow">▼</span>

          {isDropdownOpen && (
            <div className="dropdown-menu open">
              <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
                <span className="dropdown-icon">👤</span>
                Profile
              </Link>
              <Link to="/orders" className="dropdown-item" onClick={closeDropdown}>
                <span className="dropdown-icon">📦</span>
                My Orders
              </Link>
              <Link to="/wishlist" className="dropdown-item" onClick={closeDropdown}>
                <span className="dropdown-icon">❤️</span>
                Wishlist
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={closeDropdown}>
                <span className="dropdown-icon">⚙️</span>
                Settings
              </Link>
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
