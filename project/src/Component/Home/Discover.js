import React from 'react';
import './Discover.css';
import discoverImage from './b6.png';

const Discover = () => {
  return (
    <section className="discover-section" id="discover">
      <div className="content-container">
        <img src={discoverImage} alt="Discover More" className="section-image" />
        <div className="content">
          <h2>Discover More</h2>
          <p>
            Explore our range of services designed to cater to all your corporate event needs.
            Join us today and experience hassle-free event planning with our expert team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Discover;
