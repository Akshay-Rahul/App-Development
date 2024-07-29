import React, { useState } from 'react';
import './Venue.css';

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const [newVenue, setNewVenue] = useState({ name: '', location: '', capacity: '', amenities: '' });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue({ ...newVenue, [name]: value });
  };

  const handleAddVenue = () => {
    if (editingVenue) {
      setVenues(venues.map(venue => (venue.id === editingVenue.id ? newVenue : venue)));
      setEditingVenue(null);
    } else {
      setVenues([...venues, { ...newVenue, id: Date.now() }]);
    }
    setNewVenue({ name: '', location: '', capacity: '', amenities: '' });
  };

  const handleEditVenue = (venue) => {
    setNewVenue(venue);
    setEditingVenue(venue);
  };

  const handleDeleteVenue = (venueId) => {
    setVenues(venues.filter(venue => venue.id !== venueId));
  };

  return (
    <div className="venue-management">
      <h2>Venue Management</h2>
      <div className="venue-form">
        <input
          type="text"
          name="name"
          placeholder="Venue Name"
          value={newVenue.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newVenue.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="capacity"
          placeholder="Capacity"
          value={newVenue.capacity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={newVenue.amenities}
          onChange={handleInputChange}
        />
        <button onClick={handleAddVenue}>
          {editingVenue ? 'Update Venue' : 'Add Venue'}
        </button>
      </div>
      <div className="venue-list">
        <h3>Venue List</h3>
        {venues.map(venue => (
          <div key={venue.id} className="venue-item">
            <div className="venue-details">
              <span>{venue.name}</span>
              <span>Location: {venue.location}</span>
              <span>Capacity: {venue.capacity}</span>
              <span>Amenities: {venue.amenities}</span>
            </div>
            <div className="venue-actions">
              <button onClick={() => handleEditVenue(venue)}>Edit</button>
              <button onClick={() => handleDeleteVenue(venue.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="venue-availability">
        <h3>Venue Availability</h3>
        {/* Calendar view of venue bookings can be implemented here */}
      </div>
    </div>
  );
};

export default VenueManagement;
