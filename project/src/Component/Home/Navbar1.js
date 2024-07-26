import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from '../Assets/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar1.css';

const Navbar1 = ({ transparent }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [background, setBackground] = useState('transparent');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if the current path is the home page
  const isHomePage = location.pathname === '/';

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 500) {
      setBackground('transparent');
    } else {
      setBackground('black');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial background

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isHomePage) {
      navigate('/'); // Ensure it's the homepage if needed
    }
  };

  return (
    <nav className={`navbar1 ${transparent && isHomePage ? 'transparent' : background === 'black' ? 'black-background' : ''}`}>
      <div className="navbar-container1">
        <div 
          className="navbar-logo1"
          onClick={handleLogoClick} // Handle click to scroll to top
        >
          Yaska
        </div>
        <ul className="nav-menu1">
          <li className="nav-item1">
            <ScrollLink to="about-section" smooth={true} duration={500} className="nav-links1">
              About
            </ScrollLink>
          </li>
          <li className="nav-item1">
            <ScrollLink to="discover-section" smooth={true} duration={500} className="nav-links1">
              Discover
            </ScrollLink>
          </li>
          <li className="nav-item1">
            <ScrollLink to="services-section" smooth={true} duration={500} className="nav-links1">
              Services
            </ScrollLink>
          </li>
        </ul>
        {user ? (
          <div className="profile-dropdown1">
            <div 
              className="profile-icon1" 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              aria-haspopup="true" 
              aria-expanded={dropdownOpen}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu1">
                <div className="dropdown-header1">
                  <span className="user-name1">Hello,{user.username ? ` ${user.username}` : 'Unknown User'}</span>
                </div>
                <Link to="/profile" className="dropdown-item1">
                  <FontAwesomeIcon icon={faCog} /> Profile
                </Link>
                <button className="btn-logout1" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="btn-container1">
            <Link to="/user-login" className="btn-login1">User Login</Link>
            <Link to="/admin-login" className="btn-login1">Admin Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
