import React, { useState } from 'react';
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';
import './Tickets.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Tickets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event; // Get event details from state
  const [userId] = useState("1"); // Replace with actual user ID from your auth system

  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleJoin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Add the eventId to the user's joinedEvents
      const userResponse = await axios.get(`http://localhost:8080/users/${userId}`);
      const user = userResponse.data;
      const updatedJoinedEvents = [...user.joinedEvents, event.id];

      // Update the user's joinedEvents in the database
      await axios.patch(`http://localhost:8080/users/${userId}`, {
        joinedEvents: updatedJoinedEvents
      });

      // Show the success notification
      new Noty({
        type: 'success',
        layout: 'topRight',
        text: 'Joined successfully!',
        timeout: 3000,
      }).show();

      // Optionally, navigate to another page
      navigate('/user-dashboard'); // Navigate to MyEvents or another page if needed
    } catch (error) {
      console.error('Error joining the event:', error);
      new Noty({
        type: 'error',
        layout: 'topRight',
        text: 'Error joining the event. Please try again.',
        timeout: 3000,
      }).show();
    }
  };

  return (
    <div className="payment-page">
      <header className="header">
        <div className="logo">Yaska</div>
        {/* Navigation links can be added here */}
      </header>
      
      <div className="container">
        <div className="payment-details">
          <h2>Event Details</h2>
          <div className="event-summary">
            <h3>Event: <span>{event?.title || 'N/A'}</span></h3>
            <p>Date: <span>{event?.date || 'N/A'}</span></p>
            <p>Location: <span>{event?.location || 'N/A'}</span></p>
          </div>
          
          <form className="payment-form" onSubmit={handleJoin}>
            <h3>Payment Information</h3>
            <label>
              Name on Card
              <input
                type="text"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </label>
            <label>
              Card Number
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </label>
            <label>
              Expiration Date
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </label>
            <label>
              CVV
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </label>
            <button type="submit" className="submit-button">Pay Now</button>
          </form>
        </div>
        
        <aside className="order-summary">
          <h3>Order Summary</h3>
          <p>Event Ticket: $100</p>
          <p>Tax: $5</p>
          <p>Total: $105</p>
        </aside>
      </div>
    </div>
  );
};

export default Tickets;
