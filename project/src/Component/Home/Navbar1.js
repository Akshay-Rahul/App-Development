import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from '../Assets/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icon
import './Navbar1.css';

const Navbar1 = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Yaska
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <ScrollLink to="about" smooth={true} duration={500} className="nav-links">
              About
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink to="discover" smooth={true} duration={500} className="nav-links">
              Discover
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink to="services" smooth={true} duration={500} className="nav-links">
              Services
            </ScrollLink>
          </li>
        </ul>
        {user ? (
          <div className="profile-dropdown">
            <div 
              className="profile-icon" 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              aria-haspopup="true" 
              aria-expanded={dropdownOpen}
            >
              <FontAwesomeIcon icon={faUser} /> {/* Using FontAwesomeIcon */}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="user-name">{user.username ? ` ${user.username}` : 'Unknown User'}</span>
                </div>
                <button className="btn btn-logout" onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-login">Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
