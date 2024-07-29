import React, { useState } from 'react';
import './Sponsers.css'; // Ensure you have this CSS file

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([
    { id: 1, name: 'Company A', details: 'Gold Sponsor', email: 'contact@companya.com', phone: '123-456-7890' },
    { id: 2, name: 'Company B', details: 'Silver Sponsor', email: 'contact@companyb.com', phone: '123-456-7890' },
    { id: 3, name: 'Company C', details: 'Bronze Sponsor', email: 'contact@companyc.com', phone: '123-456-7890' }
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
