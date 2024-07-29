import React, { useState, useEffect } from 'react';
import './Overview.css';

const Overview = () => {
  const [keyMetrics, setKeyMetrics] = useState({
    events: 30,
    attendees: 500,
    ongoingEvents: 5,
    upcomingEvents: 10,
    pastEvents: 20,
  });

  const [recentActivities, setRecentActivities] = useState([
    { activity: 'Created Event: Annual Corporate Gala', date: 'July 25, 2024' },
    { activity: 'Updated Event: Product Launch', date: 'July 20, 2024' },
    { activity: 'Deleted Event: Team Building Retreat', date: 'July 15, 2024' },
  ]);

  const [recentEvents, setRecentEvents] = useState([
    { title: 'Annual Corporate Gala', date: 'July 25, 2024' },
    { title: 'Product Launch', date: 'July 20, 2024' },
    { title: 'Team Building Retreat', date: 'July 15, 2024' },
  ]);

  const [upcomingHighlights, setUpcomingHighlights] = useState([
    { title: 'Innovation Conference', date: 'August 10, 2024' },
    { title: 'Leadership Workshop', date: 'August 20, 2024' },
  ]);

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchMetrics = () => {
      setKeyMetrics({
        events: 30,
        attendees: 500,
        ongoingEvents: 5,
        upcomingEvents: 10,
        pastEvents: 20,
      });
    };

    const fetchRecentActivities = () => {
      setRecentActivities([
        { activity: 'Created Event: Annual Corporate Gala', date: 'July 25, 2024' },
        { activity: 'Updated Event: Product Launch', date: 'July 20, 2024' },
        { activity: 'Deleted Event: Team Building Retreat', date: 'July 15, 2024' },
      ]);
    };

    const fetchRecentEvents = () => {
      setRecentEvents([
        { title: 'Annual Corporate Gala', date: 'July 25, 2024' },
        { title: 'Product Launch', date: 'July 20, 2024' },
        { title: 'Team Building Retreat', date: 'July 15, 2024' },
      ]);
    };

    const fetchUpcomingHighlights = () => {
      setUpcomingHighlights([
        { title: 'Innovation Conference', date: 'August 10, 2024' },
        { title: 'Leadership Workshop', date: 'August 20, 2024' },
      ]);
    };

    fetchMetrics();
    fetchRecentActivities();
    fetchRecentEvents();
    fetchUpcomingHighlights();
  }, []);

  return (
    <div className="overview">
      <h1>Corporate Event Overview</h1>
      <p className="overview-description">Overview of key metrics and information for your corporate events.</p>
      <div className="overview-stats">
        <div className="stat-box">
          <h2>{keyMetrics.events}</h2>
          <p>Total Events</p>
        </div>
        <div className="stat-box">
          <h2>{keyMetrics.attendees}</h2>
          <p>Total Attendees</p>
        </div>
        <div className="stat-box">
          <h2>{keyMetrics.ongoingEvents}</h2>
          <p>Ongoing Events</p>
        </div>
        <div className="stat-box">
          <h2>{keyMetrics.upcomingEvents}</h2>
          <p>Upcoming Events</p>
        </div>
        <div className="stat-box">
          <h2>{keyMetrics.pastEvents}</h2>
          <p>Past Events</p>
        </div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activity</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.activity}</strong> - {activity.date}
            </li>
          ))}
        </ul>
      </div>
      <div className="recent-events">
        <h2>Recent Events</h2>
        <ul>
          {recentEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> - {event.date}
            </li>
          ))}
        </ul>
      </div>
      <div className="upcoming-highlights">
        <h2>Upcoming Highlights</h2>
        <ul>
          {upcomingHighlights.map((highlight, index) => (
            <li key={index}>
              <strong>{highlight.title}</strong> - {highlight.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
