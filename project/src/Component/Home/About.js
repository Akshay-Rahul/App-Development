import React from 'react';
import './About.css';
import aboutImage from './b5.png';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="content-container">
        <div className="content">
          <h2>About Us</h2>
          <p>
            We specialize in comprehensive corporate event management services, ensuring every detail is meticulously planned and executed.
            Our experienced team is dedicated to making your events successful and memorable.
          </p>
        </div>
        <img src={aboutImage} alt="About Us" className="section-image" />
      </div>
    </section>
  );
};

export default About;
