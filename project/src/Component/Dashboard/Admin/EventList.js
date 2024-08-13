// src/EventList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './EventList.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal201" onClick={onClose}>
      <div className="modal2-content01" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

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

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const handleDelete = (eventId) => {
    setConfirmDelete(eventId);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${confirmDelete}`);
      setEvents(events.filter(event => event.id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSave = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:8080/events/${updatedEvent.id}`, updatedEvent);
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
      setEditEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (!events || events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-list-page02">
      <h2 className="event-h1-02">Event List</h2>
      <div className="event-list02">
        {events.map(event => (
          <div key={event.id} className="event-card02">
            <img src={event.img || 'https://via.placeholder.com/300'} alt={event.title} className="event-image02" />
            <div className="event-details02">
              <h4 className="event-name02">{event.title}</h4>
              <p className="event-location02"><strong>Date:</strong> {event.date}</p>
              <p className="event-location02"><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <p className="event-location02"><strong>Location:</strong> {event.location}</p>
              <p className="event-location02"><strong>Description:</strong> {event.description}</p>
              <p className="event-location02"><strong>Organizer:</strong> {event.organizerName}</p>
            </div>
            <div className="event-actions02">
              <FontAwesomeIcon icon={faEdit} className="icon-edit02" onClick={() => handleEdit(event)} />
              <FontAwesomeIcon icon={faTrash} className="icon-delete02" onClick={() => handleDelete(event.id)} />
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={editEvent !== null} onClose={() => setEditEvent(null)}>
        {editEvent && (
          <div className="edit-event-modal02">
            <h3>Edit Event</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave({
                  ...editEvent,
                  title: e.target.title.value,
                  date: e.target.date.value,
                  startTime: e.target.startTime.value,
                  endTime: e.target.endTime.value,
                  location: e.target.location.value,
                  description: e.target.description.value,
                  organizerName: e.target.organizerName.value,
                });
              }}
            >
              <label htmlFor="title">Title</label>
              <input id="title" name="title" defaultValue={editEvent.title} />
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" defaultValue={editEvent.date} />
              <label htmlFor="startTime">Start Time</label>
              <input id="startTime" name="startTime" type="time" defaultValue={editEvent.startTime} />
              <label htmlFor="endTime">End Time</label>
              <input id="endTime" name="endTime" type="time" defaultValue={editEvent.endTime} />
              <label htmlFor="location">Location</label>
              <input id="location" name="location" defaultValue={editEvent.location} />
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" defaultValue={editEvent.description} />
              <label htmlFor="organizerName">Organizer Name</label>
              <input id="organizerName" name="organizerName" defaultValue={editEvent.organizerName} />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditEvent(null)}>Cancel</button>
            </form>
          </div>
        )}
      </Modal>
      <Modal isOpen={confirmDelete !== null} onClose={cancelDelete}>
        <div className="delete-event-modal02">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDeleteEvent}>Yes, Delete</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default EventList;
