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
    const fetchData = () => {
      setKeyMetrics({
        events: 30,
        attendees: 500,
        ongoingEvents: 5,
        upcomingEvents: 10,
        pastEvents: 20,
      });
      setRecentActivities([
        { activity: 'Created Event: Annual Corporate Gala', date: 'July 25, 2024' },
        { activity: 'Updated Event: Product Launch', date: 'July 20, 2024' },
        { activity: 'Deleted Event: Team Building Retreat', date: 'July 15, 2024' },
      ]);
      setRecentEvents([
        { title: 'Annual Corporate Gala', date: 'July 25, 2024' },
        { title: 'Product Launch', date: 'July 20, 2024' },
        { title: 'Team Building Retreat', date: 'July 15, 2024' },
      ]);
      setUpcomingHighlights([
        { title: 'Innovation Conference', date: 'August 10, 2024' },
        { title: 'Leadership Workshop', date: 'August 20, 2024' },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="overview">
      <h1>Corporate Event Overview</h1>
      <p className="overview-description">Overview of key metrics and information for your corporate events.</p>

      <div className="texteffect">
        <h2 className='h2'>
          <span>W</span>e make everything <span>P</span>rofessional and <span>P</span>erfect!
        </h2>
      </div>

      <MetricsSection metrics={keyMetrics} />
      <InfoSection title="Recent Activity" items={recentActivities} />
      <InfoSection title="Recent Events" items={recentEvents} />
      <InfoSection title="Upcoming Highlights" items={upcomingHighlights} />
    </div>
  );
};

const MetricsSection = ({ metrics }) => (
  <div className="stats-container">
    {Object.entries(metrics).map(([key, value]) => (
      <StatItem key={key} number={value} label={key.replace(/([A-Z])/g, ' $1').toUpperCase()} />
    ))}
  </div>
);

const InfoSection = ({ title, items }) => (
  <div className={`${title.toLowerCase().replace(/ /g, '-')}`}>
    <h2>{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <strong>{item.title || item.activity}</strong> - {item.date}
        </li>
      ))}
    </ul>
  </div>
);

const StatItem = ({ number, label }) => (
  <div className="stat-item">
    <h3>{number}</h3>
    <p>{label}</p>
  </div>
);

export default Overview;
