import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyEvents.css'; // Import the CSS file for styling

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-management-page">
      <header className="header">
        <h1>Event Management</h1>
        <p>View all available events.</p>
      </header>

      <ul className="event-list">
        {events.length === 0 ? (
          <li className="event-item">No events available.</li>
        ) : (
          events.map(event => (
            <li key={event.id} className="event-item">
              <div className="event-details">
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyEvents;
