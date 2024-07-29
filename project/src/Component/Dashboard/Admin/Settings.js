import React from 'react';
import './Settings.css';

const SettingsPanel = ({ activeSection }) => {
  return (
    <div className="settings-panel">
      {activeSection === 'general' && <GeneralSettings />}
      {activeSection === 'emailTemplates' && <EmailTemplates />}
      {activeSection === 'permissionsRoles' && <PermissionsRoles />}
    </div>
  );
};

const GeneralSettings = () => (
  <div className="settings-section">
    <h2>General Settings</h2>
    {/* Add configuration options for time zone, default language, branding */}
  </div>
);

const EmailTemplates = () => (
  <div className="settings-section">
    <h2>Email Templates</h2>
    {/* Add email template management options */}
  </div>
);

const PermissionsRoles = () => (
  <div className="settings-section">
    <h2>Permissions and Roles</h2>
    {/* Add user roles and permissions management options */}
  </div>
);

export default SettingsPanel;
