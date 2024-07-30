import React, { useState } from 'react';
import './Sponsers.css'; // Ensure you have this CSS file

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([
    { id: 1, name: 'Google', details: 'Platinum Sponsor', logo: 'path/to/google-logo.png', email: 'contact@google.com', phone: '123-456-7890' },
    { id: 2, name: 'Microsoft', details: 'Gold Sponsor', logo: 'path/to/microsoft-logo.png', email: 'contact@microsoft.com', phone: '123-456-7890' },
    { id: 3, name: 'Apple', details: 'Silver Sponsor', logo: 'path/to/apple-logo.png', email: 'contact@apple.com', phone: '123-456-7890' },
    { id: 4, name: 'Amazon', details: 'Gold Sponsor', logo: 'path/to/amazon-logo.png', email: 'contact@amazon.com', phone: '123-456-7890' },
    { id: 5, name: 'Facebook', details: 'Silver Sponsor', logo: 'path/to/facebook-logo.png', email: 'contact@facebook.com', phone: '123-456-7890' },
    { id: 6, name: 'IBM', details: 'Bronze Sponsor', logo: 'path/to/ibm-logo.png', email: 'contact@ibm.com', phone: '123-456-7890' },
    { id: 7, name: 'Intel', details: 'Bronze Sponsor', logo: 'path/to/intel-logo.png', email: 'contact@intel.com', phone: '123-456-7890' },
    { id: 8, name: 'Netflix', details: 'Gold Sponsor', logo: 'path/to/netflix-logo.png', email: 'contact@netflix.com', phone: '123-456-7890' }
  ]);
  const [newSponsor, setNewSponsor] = useState({ name: '', details: '', email: '', phone: '' });

  const handleAddSponsor = () => {
    const newId = sponsors.length ? sponsors[sponsors.length - 1].id + 1 : 1;
    setSponsors([...sponsors, { id: newId, ...newSponsor }]);
    setNewSponsor({ name: '', details: '', email: '', phone: '' });
  };

  const handleRemoveSponsor = (id) => {
    setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
  };

  return (
    <div className="sponsors-container">
      <h2>Sponsors</h2>
      <button className="btn-add-sponsor" onClick={handleAddSponsor}>Add New Sponsor</button>
      <ul className="sponsors-list">
        {sponsors.map(sponsor => (
          <li key={sponsor.id} className="sponsor-item">
            <div className="sponsor-details">
              <h3>{sponsor.name}</h3>
              <p>{sponsor.details}</p>
              <p>Email: {sponsor.email}</p>
              <p>Phone: {sponsor.phone}</p>
            </div>
            <button className="btn-remove-sponsor" onClick={() => handleRemoveSponsor(sponsor.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="sponsor-form">
        <label>
          Name:
          <input type="text" value={newSponsor.name} onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })} />
        </label>
        <label>
          Details:
          <input type="text" value={newSponsor.details} onChange={(e) => setNewSponsor({ ...newSponsor, details: e.target.value })} />
        </label>
        <label>
          Email:
          <input type="email" value={newSponsor.email} onChange={(e) => setNewSponsor({ ...newSponsor, email: e.target.value })} />
        </label>
        <label>
          Phone:
          <input type="tel" value={newSponsor.phone} onChange={(e) => setNewSponsor({ ...newSponsor, phone: e.target.value })} />
        </label>
        <button onClick={handleAddSponsor}>Add Sponsor</button>
      </div>
    </div>
  );
};

export default Sponsors;
