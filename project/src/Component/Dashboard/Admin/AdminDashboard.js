import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';
import { useAuth } from '../../Assets/AuthContext';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCogs, faSlidersH } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    new Noty({
      type: 'success',
      layout: 'topRight',
      text: 'Logout successful!',
      timeout: 3000
    }).show();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">EventManager Admin </div>
        <div className="navbar-links">
          <div className="profile-dropdown">
            <div
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="user-name">
                    Hello, {user?.username ? user.username : 'Unknown User'}
                  </span>
                </div>
                <Link to="/settings" className="dropdown-item">
                  <FontAwesomeIcon icon={faCogs} /> Settings
                </Link>
                <button className="btn-logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="dashboard-content">
        <aside className="side-panel">
          <h3 className="side-panel-title">Menu</h3>
          <ul className="side-panel-links">
            <li><a href="/events">Manage Events</a></li>
            <li><a href="/attendees">Attendees</a></li>
            <li><a href="/sponsors">Sponsors</a></li>
            <li><a href="/reports">Reports</a></li>
          </ul>
        </aside>
        <main className="main-section">
          <h1 className="main-title">Welcome to the Admin Dashboard</h1>
          <div className="main-content">
            <div className="widget">
              <h2>Dashboard Overview</h2>
              <p>Get an overview of events, attendees, and metrics.</p>
            </div>
            <div className="widget">
              <h2>Event Management</h2>
              <p>Create, Edit, or Delete events.</p>
              <button>Create Event</button>
              <button>Edit Event</button>
              <button>Delete Event</button>
            </div>
            <div className="widget">
              <h2>User Management</h2>
              <p>Add, Edit, or Delete users.</p>
              <button>Add User</button>
              <button>Edit User</button>
              <button>Delete User</button>
            </div>
            <div className="widget">
              <h2>View Registrations</h2>
              <p>See all event registrations.</p>
            </div>
            <div className="widget">
              <h2>Notifications Management</h2>
              <p>Manage notifications sent to users.</p>
            </div>
            <div className="widget">
              <h2>Reports</h2>
              <p>Generate and view reports and analytics.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
