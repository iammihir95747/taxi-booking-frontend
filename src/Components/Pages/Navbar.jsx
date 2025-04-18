import React, { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Track login/logout by watching localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRegister = () => {
    navigate("/category");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); // Redirect after logout
  };

  return (
    <nav className="navbar">
        <div className="nav-logo"><Link to="/" className="nav-logo">MarutiCabs</Link></div>
        
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li><Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link></li>
          
          <div className="mobile-auth-buttons">
            {!isLoggedIn ? (
              <>
                <button className="nav-button-login" onClick={handleLogin}>Login</button>
                <button className="nav-button" onClick={handleRegister}>Sign up for free</button>
              </>
            ) : (
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </ul>
        
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
       <div className="nav-right desktop-only">
        {!isLoggedIn ? (
          <>
            <button className="nav-button-login" onClick={handleLogin}>Login</button>
            <button className="nav-button" onClick={handleRegister}>Signup for free</button>
          </>
        ) : (
          <>
          <a href="/profile" className="profileimg">
           <img src="https://img.freepik.com/premium-vector/business-man-avatar-vector_1133257-2430.jpg?uid=R138514720&ga=GA1.1.813448193.1738151317&semt=ais_hybrid" alt="" />
          </a>
          <button className="nav-button-logout" onClick={handleLogout}>Logout</button> 
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
