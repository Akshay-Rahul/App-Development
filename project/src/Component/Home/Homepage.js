import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Assets/AuthContext'; // Adjust path if needed
import Button from '../Home/Button'; // Adjust path if needed
import Navbar1 from '../Home/Navbar1'; // Adjust path if needed
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Homepage.css'; // Ensure this path is correct

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
      navigate('/login'); // Redirect to login if user is not logged in
    } else {
      navigate('/dashboard'); // Redirect to dashboard if user is logged in
    }
  };

  return (
    <div className="full-page-container">
      <Navbar1 />
      <div className="hero-container">
        <h1>Welcome{user ? `, ${user.username}` : ''} to Your Corporate Event Hub</h1>
        <p>Organize and manage your corporate events effortlessly. Sign up today and streamline your event planning.</p>
        <Button text="Get Started!" onClick={handleGetStartedClick} />
      </div>
    </div>
  );
};

export default Homepage;
