import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';
import { useAuth } from '../../Assets/AuthContext';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCogs, faBell } from '@fortawesome/free-solid-svg-icons';
import EventManagement from './EventManagement';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Overview from './Overview';
import Sponsors from './Sponsors';
import SettingsPanel from './Settings';
import TaskManagement from './Task';
import VenueManagement from './Venue';
import EventList from './EventList'; // Import EventList

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('overview');

  const handleLogout = () => {
    logout();
    new Noty({
      type: 'success',
      layout: 'topRight',
      text: 'Logout successful!',
      timeout: 3000,
    }).show();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <Navbar
        user={user}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        handleLogout={handleLogout}
      />
      <div className="dashboard-content">
        <SidePanel setActivePanel={setActivePanel} />
        <MainSection activePanel={activePanel} />
      </div>
    </div>
  );
};

const Navbar = ({ user, dropdownOpen, setDropdownOpen, handleLogout }) => (
  <nav className="navbar">
    <div className="navbar-logo">Yaska Admin</div>
    <div className="navbar-links">
      <div className="notification-icon">
        <FontAwesomeIcon icon={faBell} />
        <span className="notification-badge">3</span>
      </div>
      <ProfileDropdown
        user={user}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        handleLogout={handleLogout}
      />
    </div>
  </nav>
);

const ProfileDropdown = ({ user, dropdownOpen, setDropdownOpen, handleLogout }) => (
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
);

const SidePanel = ({ setActivePanel }) => (
  <aside className="side-panel">
    <h3 className="side-panel-title">Menu</h3>
    <ul className="side-panel-links">
      <li><button onClick={() => setActivePanel('overview')}>Overview</button></li>
      <li><button onClick={() => setActivePanel('events')}>Manage Events</button></li>
      <li><button onClick={() => setActivePanel('eventList')}>Event List</button></li>
      <li><button onClick={() => setActivePanel('attendees')}>Attendees</button></li>
      <li><button onClick={() => setActivePanel('sponsors')}>Sponsors</button></li>
      <li><button onClick={() => setActivePanel('reports')}>Reports</button></li>
      <li><button onClick={() => setActivePanel('settings')}>Settings</button></li>
      <li><button onClick={() => setActivePanel('tasks')}>Tasks</button></li>
      <li><button onClick={() => setActivePanel('venues')}>Venues</button></li>
    </ul>
  </aside>
);

const MainSection = ({ activePanel }) => (
  <main className="main-section">
    <div className="main-content">
      {activePanel === 'overview' && <Overview />}
      {activePanel === 'events' && <EventManagement />}
      {activePanel === 'eventList' && <EventList />}
      {activePanel === 'attendees' && <UserManagement />}
      {activePanel === 'sponsors' && <Sponsors />}
      {activePanel === 'reports' && <Reports />}
      {activePanel === 'settings' && <SettingsPanel activeSection="general" />}
      {activePanel === 'emailTemplates' && <SettingsPanel activeSection="emailTemplates" />}
      {activePanel === 'permissionsRoles' && <SettingsPanel activeSection="permissionsRoles" />}
      {activePanel === 'tasks' && <TaskManagement />}
      {activePanel === 'venues' && <VenueManagement />}
    </div>
  </main>
);

export default AdminDashboard;
