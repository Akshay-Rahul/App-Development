import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import { useAuth } from '../../Assets/AuthContext';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
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
        <div className="navbar-logo">EventManager User</div>
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
            <li><a href="/myevents">My Events</a></li>
            <li><a href="/registrations">Registrations</a></li>
            <li><a href="/tickets">Tickets</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </aside>
        <main className="main-section">
          <h1 className="main-title">Welcome to Your Dashboard User</h1>
          <div className="main-content">
            <div className="widget">
              <h2>Dashboard Overview</h2>
              <p>Overview of your events and activities.</p>
            </div>
            <div className="widget">
              <h2>View Events</h2>
              <p>Browse all available events.</p>
              <button>View Events</button>
            </div>
            <div className="widget">
              <h2>Register for Events</h2>
              <p>Sign up for upcoming events.</p>
              <button>Register</button>
            </div>
            <div className="widget">
              <h2>My Registrations</h2>
              <p>View your current event registrations.</p>
            </div>
            <div className="widget">
              <h2>Profile Management</h2>
              <p>Edit your profile details.</p>
              <button>Edit Profile</button>
            </div>
            <div className="widget">
              <h2>Notifications</h2>
              <p>Check your notifications.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
