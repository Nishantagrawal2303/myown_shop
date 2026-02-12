import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{
      display: "flex",
      gap: 15,
      padding: 15,
      borderBottom: "1px solid #ccc"
    }}>

      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>

      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user && (
        <>
          <span>Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}

    </nav>
  );
}
