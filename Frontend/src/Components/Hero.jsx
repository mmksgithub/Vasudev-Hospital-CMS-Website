import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../env';

const Hero = () => {
  const [heroData, setHeroData] = useState([]);

  // Fetch hero section from the backend
  const fetchHero = async () => {
    try {
      const response = await axios.get(`${config.PROJECT_URL}/api/hero`);
      setHeroData(response.data); // Assume this now returns an array of hero sections
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  if (heroData.length === 0) return <div>Loading...</div>; // Adjust loading condition

  return (
    <section id="hero" className="hero section hs">
      <div
        id="hero-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval={5000}
      >
        <div className="carousel-inner">
          {heroData.map((hero, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={hero._id}>
              <img
                src={`${config.PROJECT_URL}/uploads/${hero.image}`} // Dynamically load the image
                className="main-img"
                alt="Hero Background"
              />
              <div className="container">
                <h2>{hero.header}</h2> {/* Dynamically load header */}
                <p>{hero.description}</p> {/* Dynamically load description */}
                <a href="#about" className="btn-get-started read-btn">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          />
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          />
          <span className="visually-hidden">Next</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
