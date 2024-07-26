// AdminDashboard.js
import React from 'react';
import { useAuth } from '../Assets/AuthContext';
import Navbar1 from '../Home/Navbar1';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-dashboard">
      <Navbar1 />
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.username}. Manage your system and users from here.</p>
        {/* Add admin-specific functionalities here */}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
