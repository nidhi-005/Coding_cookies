// src/components/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import (without brackets)
import '../Styles/Header.css';
import logo from './images/image.png';
import { FaBars } from 'react-icons/fa';
import axios from './axiosInstance';
import { AuthContext } from '../context/AuthContext'; 

function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loginRole, setLoginRole] = useState(null); // Store login role
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 740);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => {
    setMenuToggle(false);
  };

  const handleLoginClick = (role) => {
    setLoginRole(role); // Set the role (student/admin)
    setShowPopup(true); // Show Google OAuth popup
  };

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    setIsAuthenticated(true);
    setShowPopup(false); // Close the popup after success

    // Navigate based on the login role
    if (loginRole === 'student') {
      navigate('/options');
    } else {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUser(null);
    setLoginRole(null);
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo-nav-new">
        <div className="logo">
          <a href="https://iitdh.ac.in">
            <img src={logo} alt="iitdh logo" />
          </a>
        </div>
        <Link to="/" onClick={closeMenu} className="header-title">
          <h1>Indoor Sports Occupancy Tracker</h1>
        </Link>
      </div>

      <div className="login-buttons">
        <button onClick={() => handleLoginClick('student')}>Student Login</button>
        <button onClick={() => handleLoginClick('admin')}>Admin Login</button>
      </div>

      <div className='nav-right'>
        <div className="mobile-menu" onClick={() => setMenuToggle(!menuToggle)}>
          <FaBars className="menu-icon" />
        </div>
        <ul className={menuToggle ? 'nav-options active' : 'nav-options'}>
          <li className="option" onClick={closeMenu}>
            {isAuthenticated ? (
              <>
                <span className="hi-username">Hi, {user.given_name}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <></> // Login handled by separate buttons above
            )}
          </li>
        </ul>
      </div>

      {/* Conditionally Render Google Login Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Login as {loginRole}</h3>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
              useOneTap={false} // Disable one-tap to force popup
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
