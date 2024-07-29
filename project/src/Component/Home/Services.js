import React from 'react';
import './Services.css';
import eventPlanningImage from './w1.jpg';
import venueSelectionImage from './w2.jpg';
import cateringServicesImage from './w3.jpg';

const Services = () => {
  return (
    <section className="services-section" id="services">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service-card">
          <img src={eventPlanningImage} alt="Event Planning" className="service-image" />
          <h3>Event Planning</h3>
          <p>Our team offers end-to-end event planning services to ensure your event runs smoothly from start to finish.</p>
        </div>
        <div className="service-card">
          <img src={venueSelectionImage} alt="Venue Selection" className="service-image" />
          <h3>Venue Selection</h3>
          <p>We assist in finding the perfect venue for your event, tailored to your specific requirements and budget.</p>
        </div>
        <div className="service-card">
          <img src={cateringServicesImage} alt="Catering Services" className="service-image" />
          <h3>Catering Services</h3>
          <p>Our top-notch catering services provide a variety of menu options to delight your guests.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
