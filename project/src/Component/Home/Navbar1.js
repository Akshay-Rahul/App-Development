import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useAuth } from '../Assets/AuthContext';
import './Navbar1.css';

const Navbar1 = ({ transparent }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [background, setBackground] = useState('transparent');
  const [activeSection, setActiveSection] = useState('');

  const isHomePage = location.pathname === '/';

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 500) {
      setBackground('transparent');
    } else {
      setBackground('black');
    }

    const sections = ['about', 'discover', 'services'];
    sections.forEach((section) => {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const pathToSection = {
      '/about': 'about',
      '/discover': 'discover',
      '/services': 'services',
    };
    const currentSection = pathToSection[location.pathname];
    if (currentSection) {
      setActiveSection(currentSection);
    } else if (location.pathname === '/') {
      setActiveSection('');
    }
  }, [location.pathname]);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isHomePage) {
      navigate('/');
    }
  };

  return (
    <nav className={`navbar1 ${transparent && isHomePage ? 'transparent' : background === 'black' ? 'black-background' : ''}`}>
      <div className="navbar-container1">
        <div className="navbar-logo1" onClick={handleLogoClick}>
          Yaska
        </div>
        <ul className="nav-menu1">
          <li className="nav-item1">
            {isHomePage ? (
              <ScrollLink
                to="about-section"
                smooth={true}
                duration={500}
                className={`nav-links1 ${activeSection === 'about' ? 'nav-links1-active' : ''}`}
                activeClass="nav-links1-active"
              >
                About
              </ScrollLink>
            ) : (
              <Link
                to="/about"
                className={`nav-links1 ${location.pathname === '/about' ? 'nav-links1-active' : ''}`}
              >
                About
              </Link>
            )}
          </li>
          <li className="nav-item1">
            {isHomePage ? (
              <ScrollLink
                to="discover-section"
                smooth={true}
                duration={500}
                className={`nav-links1 ${activeSection === 'discover' ? 'nav-links1-active' : ''}`}
                activeClass="nav-links1-active"
              >
                Discover
              </ScrollLink>
            ) : (
              <Link
                to="/discover"
                className={`nav-links1 ${location.pathname === '/discover' ? 'nav-links1-active' : ''}`}
              >
                Discover
              </Link>
            )}
          </li>
          <li className="nav-item1">
            {isHomePage ? (
              <ScrollLink
                to="services-section"
                smooth={true}
                duration={500}
                className={`nav-links1 ${activeSection === 'services' ? 'nav-links1-active' : ''}`}
                activeClass="nav-links1-active"
              >
                Services
              </ScrollLink>
            ) : (
              <Link
                to="/services"
                className={`nav-links1 ${location.pathname === '/services' ? 'nav-links1-active' : ''}`}
              >
                Services
              </Link>
            )}
          </li>
        </ul>
        <div className="btn-container1">
          <Link to="/user-login" className="btn-login1">User Login</Link>
          <Link to="/admin-login" className="btn-login1">Admin Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
