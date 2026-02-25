import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🛍️ My Store</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">➕ Add Product</Link>
            <Link to="/admin">🛠 Admin Panel</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {user && (
        <div className="user-section">
          <div className={`user-menu-container ${showUserMenu ? 'open' : ''}`}>
            <button className="user-menu-trigger" onClick={toggleUserMenu}>
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name}</span>
              <svg
                className={`dropdown-arrow ${showUserMenu ? 'rotated' : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar-large">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <div className="user-full-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    👤 My Profile
                  </Link>
                  <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    📦 My Orders
                  </Link>
                  <Link to="/wishlist" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    ❤️ Wishlist
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    ⚙️ Settings
                  </Link>
                </div>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
