// UserDashboard.js
import React from 'react';
import { useAuth } from '../Assets/AuthContext';
import Navbar1 from '../Home/Navbar1';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="user-dashboard">
      <Navbar1 />
      <div className="dashboard-container">
        <h1>User Dashboard</h1>
        <p>Welcome, {user.username}. Manage your events and profile from here.</p>
        {/* Add user-specific functionalities here */}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDashboard;
