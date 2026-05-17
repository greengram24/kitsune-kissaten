import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const getStoredUser = () => {
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  useEffect(() => {
    const userData = getStoredUser();
    if (userData) {
      setIsAdmin(userData.role === "admin");
      setIsLoggedIn(true);
      setUsername(userData.username || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    navigate("/");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold text-primary font-mono tracking-tight">Kitsune Kissaten</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <Link to="/menu" className="btn btn-ghost">Menu</Link>
            <Link to="/about" className="btn btn-ghost">About</Link>
            <Link to="/reviews" className="btn btn-ghost">Reviews</Link>
            <Link to="/contact" className="btn btn-ghost">Contact</Link>
            {isAdmin && <Link to="/admin" className="btn btn-primary">Admin</Link>}
            {isLoggedIn && username && (
              <span className="text-sm font-semibold text-primary">Hi, {username}</span>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            ) : (
              <Link to="/login" className="btn btn-secondary">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;