import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import { useAuth } from '../../Assets/AuthContext';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faCogs, faBell } from '@fortawesome/free-solid-svg-icons';
import Overview from './Overview';
import MyEvents from './AvailEvents';
import UserManagement from '../Admin/UserManagement';
import Reports from '../Admin/Reports';
import Tickets from './Tickets';
import EventPage from './Events';
import Sponsors from './Sponsors';
import FeedbackForm from './FeedbackForm';
import Help from './Help';

const UserDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('overview'); // Default to 'overview'

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
        <SidePanel setSelectedContent={setSelectedContent} />
        <MainSection selectedContent={selectedContent} />
      </div>
    </div>
  );
};

const Navbar = ({ user, dropdownOpen, setDropdownOpen, handleLogout }) => (
  <nav className="navbar">
    <div className="navbar-logo">Yaska User</div>
    <div className="navbar-links">
      <div className="notification-icon">
        <FontAwesomeIcon icon={faBell} />
        <span className="notification-badge">3</span> {/* Replace 3 with actual notification count */}
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
            Hello, {user?.username || 'User'}
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

const SidePanel = ({ setSelectedContent }) => (
  <aside className="side-panel">
    <h3 className="side-panel-title">Menu</h3>
    <ul className="side-panel-links">
      <li><button onClick={() => setSelectedContent('overview')}>Dashboard Overview</button></li>
      <li><button onClick={() => setSelectedContent('events')}>Avaliable Events</button></li>
      <li><button onClick={() => setSelectedContent('mine')}>MyEvents</button></li>
      <li><button onClick={() => setSelectedContent('registrations')}>Registrations</button></li>
      <li><button onClick={() => setSelectedContent('tickets')}>Tickets</button></li>
      <li><button onClick={() => setSelectedContent('Sponsors')}>Sponsers</button></li>
      <li><button onClick={() => setSelectedContent('help')}>Help</button></li>
      <li><button onClick={() => setSelectedContent('reports')}>Reports</button></li>
      <li><button onClick={() => setSelectedContent('feedback')}>FeedBack</button></li>
    </ul>
  </aside>
);

const MainSection = ({ selectedContent }) => (
  <main className="main-section">
    <div className="main-content">
      {selectedContent === 'overview' && <Overview />}
      {selectedContent === 'events' && <MyEvents />}
      {selectedContent === 'mine' && <EventPage />}
      {selectedContent === 'registrations' && <UserManagement />}
      {selectedContent === 'tickets' && <Tickets />}
      {selectedContent === 'Sponsors' && <Sponsors />}
      {selectedContent === 'reports' && <Reports />}
      {selectedContent === 'feedback' && <FeedbackForm/>}
      {selectedContent === 'help' && <Help/>}
    </div>
  </main>
);

export default UserDashboard;
