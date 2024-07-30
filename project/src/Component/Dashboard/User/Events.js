import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Event.css';

const EventPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated user data, replace with actual fetch
  const userId = "1"; // Replace with actual user ID from your auth system

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(`http://localhost:8080/users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);

        // Fetch all events
        const eventsResponse = await axios.get('http://localhost:8080/events');
        const allEvents = eventsResponse.data;

        // Filter events that user has joined
        const joinedEvents = allEvents.filter(event => userData.joinedEvents.includes(event.id));
        setEvents(joinedEvents);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user or events:', error);
        setLoading(false);
      }
    };

    fetchUserAndEvents();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-page">
      <h2>Joined Events</h2>
      {events.length > 0 ? (
        <div className="event-list">
          {events.map(event => (
            <div key={event.id} className="event-item">
              <img src={event.img || 'https://via.placeholder.com/200'} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Organizer:</strong> {event.organizerName}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events joined yet.</p>
      )}
    </div>
  );
};

export default EventPage;
