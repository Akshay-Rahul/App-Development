import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Assets/AuthContext';
import Button from '../Home/Button';
import Navbar1 from '../Home/Navbar1';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Homepage.css';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Homepage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    if (!user) {
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Please log in to continue.',
        timeout: 3000,
      }).show();
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin-dashboard'); // Redirect to admin dashboard
    } else {
      navigate('/user-dashboard'); // Redirect to user dashboard
    }
  };

  return (
    <div className="full-page-container">
      <Navbar1 transparent /> {/* Pass the transparent prop */}
      
      <div className="hero-container">
        <h1>Welcome to Your Corporate Event Hub</h1>
        <p>Organize and manage your corporate events effortlessly. Sign up today and streamline your event planning.</p>
        <Button text="Get Started!" onClick={handleGetStartedClick} />
      </div>

      <section className="about-section" id="about">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing the best financial services to our customers.
          Our goal is to help you manage your finances efficiently and effectively.
        </p>
      </section>

      <section className="discover-section" id="discover">
        <h2>Discover More</h2>
        <p>
          Learn more about our services and how we can help you achieve your financial goals.
          Join us today and take advantage of our premium offerings.
        </p>
      </section>

      <section className="services-section" id="services">
        <h2>Our Services</h2>
        <div className="services-container">
          <div className="service-card">
            <h3>Reduce expenses</h3>
            <p>We help you reduce your fees and increase your overall revenue! 😊</p>
          </div>
          <div className="service-card">
            <h3>Virtual offices</h3>
            <p>Access our platform anywhere in the world! 🌍</p>
          </div>
          <div className="service-card">
            <h3>Premium Benefits</h3>
            <p>Unlock our exclusive debit/credit card with 10% cashback! 🤑</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Videos</h3>
            <ul>
              <li><a href="#agency">Agency</a></li>
              <li><a href="#ambassadors">Ambassadors</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#demo">Demo</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Social Media</h3>
            <ul>
              <li><a href="#linkedin"><FaLinkedin /> LinkedIn</a></li>
              <li><a href="#instagram"><FaInstagram /> Instagram</a></li>
              <li><a href="#twitter"><FaTwitter /> Twitter</a></li>
              <li><a href="#facebook"><FaFacebook /> Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; Yaska - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
