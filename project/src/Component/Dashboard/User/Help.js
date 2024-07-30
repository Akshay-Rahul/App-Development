import React, { useState } from 'react';
import './Help.css'; // Ensure you have the appropriate styles

const Help = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic to send the message to the admin
    // This could involve an API call or an email service
    fetch('/api/contact-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccess(true);
          setMessage('');
        } else {
          setError('Failed to send message. Please try again.');
        }
      })
      .catch(() => setError('Failed to send message. Please try again.'));
  };

  return (
    <div className="help-container">
      <h2>Contact Admin</h2>
      {success && <p className="success-message">Your message has been sent successfully!</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          rows="5"
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Help;
