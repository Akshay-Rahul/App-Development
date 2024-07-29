import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventManagement.css'; // Import CSS file

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });
  const [createdEvent, setCreatedEvent] = useState(null);

  useEffect(() => {
    // Fetch events from the server
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events'); // JSON Server URL
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const createEvent = async (eventData) => {
    try {
      const response = await axios.post('http://localhost:8080/events', eventData); // JSON Server URL
      setEvents([...events, response.data]);
      setCreatedEvent(response.data);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const editEvent = async (eventId, updatedEventData) => {
    try {
      await axios.put(`http://localhost:8080/events/${eventId}`, updatedEventData); // JSON Server URL
      setEvents(events.map(event =>
        event.id === eventId ? { ...event, ...updatedEventData } : event
      ));
      setSelectedEventId(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${selectedEventId}`); // JSON Server URL
      setEvents(events.filter(event => event.id !== selectedEventId));
      setSelectedEventId(null);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editEvent(selectedEventId, formData);
    } else {
      createEvent(formData);
    }
    setFormData({
      title: '',
      date: '',
      location: '',
      description: ''
    });
    setIsEditing(false);
    setSelectedEventId(null);
  };

  useEffect(() => {
    if (selectedEventId) {
      const event = events.find(event => event.id === selectedEventId);
      setFormData({
        title: event?.title || '',
        date: event?.date || '',
        location: event?.location || '',
        description: event?.description || ''
      });
    }
  }, [selectedEventId, events]);

  const selectedEvent = events.find(event => event.id === selectedEventId);

  return (
    <div className="event-management-page">
      <header className="header">
        <h1>Event Management</h1>
        <p>Create, Edit, or Delete events.</p>
      </header>

      {/* Conditionally render form based on action */}
      <form onSubmit={handleFormSubmit} className="event-form">
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleFormChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
        </label>
        <button type="submit">{isEditing ? 'Update' : 'Create'} Event</button>
        <button type="button" onClick={() => { setIsEditing(false); setSelectedEventId(null); }}>
          Cancel
        </button>
      </form>

      {createdEvent && (
        <div className="created-event">
          <h2>Newly Created Event</h2>
          <p><strong>Title:</strong> {createdEvent.title}</p>
          <p><strong>Date:</strong> {createdEvent.date}</p>
          <p><strong>Location:</strong> {createdEvent.location}</p>
          <p><strong>Description:</strong> {createdEvent.description}</p>
        </div>
      )}

      <button onClick={() => setIsEditing(true)} className="btn-create">Create Event</button>
      
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
              <div className="event-actions">
                <button onClick={() => { setSelectedEventId(event.id); setIsEditing(true); }}>
                  Edit
                </button>
                <button onClick={() => { setSelectedEventId(event.id); setShowConfirmDelete(true); }}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Confirmation Modal */}
      {showConfirmDelete && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={deleteEvent}>Yes</button>
          <button onClick={() => setShowConfirmDelete(false)}>No</button>
        </div>
      )}

      {/* Event Details Section */}
      {selectedEvent && (
        <div className="event-details-section">
          <h2>Event Details</h2>
          <p><strong>Title:</strong> {selectedEvent.title}</p>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
};

export default EventManagement;
