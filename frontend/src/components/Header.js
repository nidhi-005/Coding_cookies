import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import logo from './images/image.png';
import { FaBars } from 'react-icons/fa';
import axios from './axiosInstance';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; 
import { AuthContext } from '../context/AuthContext'; 

function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuToggle(false);
  };

  const handleLogout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="header">
      <div className="logo-nav-new">
        <div className="logo">
          <a href="https://iitdh.ac.in">
            <img src={logo} alt='iitdh logo' />
          </a>
        </div>
        <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none', color: '#6A5ACD' }}>
  <h1>Indoor Sports Occupancy Tracker</h1>
</Link>

      </div>
      <div className='nav-right'>
        <div className="mobile-menu" onClick={() => setMenuToggle(!menuToggle)}>
          <FaBars className="menu-icon" />
        </div>
        <ul className={menuToggle ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMenu}>
            {isAuthenticated ? (
              <>
                <span className="hi-username">Hi, {user.given_name}</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  setUser(decoded);
                  setIsAuthenticated(true);
                  // Register or find the user in the backend
                  try {
                    await axios.post('/users/register', {
                      name: decoded.name,
                      email: decoded.email,
                    });
                  } catch (error) {
                    console.error('Error registering user:', error);
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
