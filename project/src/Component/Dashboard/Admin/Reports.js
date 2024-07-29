import React from 'react';
import './Report.css';

const Reports = () => {
  const data = [
    { category: 'Event A', participants: 150, revenue: 3000, satisfaction: 4.5 },
    { category: 'Event B', participants: 200, revenue: 5000, satisfaction: 4.8 },
    { category: 'Event C', participants: 100, revenue: 1500, satisfaction: 4.0 },
  ];

  const totalParticipants = data.reduce((total, event) => total + event.participants, 0);
  const totalRevenue = data.reduce((total, event) => total + event.revenue, 0);
  const averageSatisfaction = (data.reduce((total, event) => total + event.satisfaction, 0) / data.length).toFixed(2);

  const handleCustomReport = () => {
    // Logic for generating custom reports
  };

  const handleDownloadReport = () => {
    // Logic for downloading reports
  };

  return (
    <div className="reports-widget">
      <h2 className="header">Reports</h2>
      <p>Generate and view reports and analytics for corporate events.</p>

      <div className="summary">
        <h3>Summary</h3>
        <p><strong>Total Participants:</strong> {totalParticipants}</p>
        <p><strong>Total Revenue:</strong> ${totalRevenue}</p>
        <p><strong>Average Satisfaction:</strong> {averageSatisfaction} / 5</p>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Participants</th>
            <th>Revenue ($)</th>
            <th>Satisfaction (out of 5)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event, index) => (
            <tr key={index}>
              <td>{event.category}</td>
              <td>{event.participants}</td>
              <td>{event.revenue}</td>
              <td>{event.satisfaction}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="btn-group">
        <button className="btn" onClick={handleCustomReport}>Generate Custom Report</button>
        <button className="btn" onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
};

export default Reports;
