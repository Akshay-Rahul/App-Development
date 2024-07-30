import React, { useState } from 'react';
import './Sponsors.css'; // Ensure you have this CSS file

const Sponsors = () => {
  const [sponsors] = useState([
    { id: 1, name: 'Google', details: 'Platinum Sponsor', logo: 'path/to/google-logo.png', email: 'contact@google.com', phone: '123-456-7890' },
    { id: 2, name: 'Microsoft', details: 'Gold Sponsor', logo: 'path/to/microsoft-logo.png', email: 'contact@microsoft.com', phone: '123-456-7890' },
    { id: 3, name: 'Apple', details: 'Silver Sponsor', logo: 'path/to/apple-logo.png', email: 'contact@apple.com', phone: '123-456-7890' },
    { id: 4, name: 'Amazon', details: 'Gold Sponsor', logo: 'path/to/amazon-logo.png', email: 'contact@amazon.com', phone: '123-456-7890' },
    { id: 5, name: 'Facebook', details: 'Silver Sponsor', logo: 'path/to/facebook-logo.png', email: 'contact@facebook.com', phone: '123-456-7890' },
    { id: 6, name: 'IBM', details: 'Bronze Sponsor', logo: 'path/to/ibm-logo.png', email: 'contact@ibm.com', phone: '123-456-7890' },
    { id: 7, name: 'Intel', details: 'Bronze Sponsor', logo: 'path/to/intel-logo.png', email: 'contact@intel.com', phone: '123-456-7890' },
    { id: 8, name: 'Netflix', details: 'Gold Sponsor', logo: 'path/to/netflix-logo.png', email: 'contact@netflix.com', phone: '123-456-7890' }
  ]);

  return (
    <div className="sponsors-container">
      <h2>Sponsors</h2>
      <ul className="sponsors-list">
        {sponsors.map(sponsor => (
          <li key={sponsor.id} className="sponsor-item">
            <div className="sponsor-logo">
              <img src={sponsor.logo} alt={`${sponsor.name} Logo`} />
            </div>
            <div className="sponsor-details">
              <h3>{sponsor.name}</h3>
              <p>{sponsor.details}</p>
              <p>Email: {sponsor.email}</p>
              <p>Phone: {sponsor.phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sponsors;
