import React, { useEffect, useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import config from '../../env';


const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/services`); // API endpoint for services
        setServicesData(response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };

    fetchServicesData();
  }, []);

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Vasudev Hospital Provides Best Services.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {servicesData.map((service, index) => (
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
              key={index}
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <img
                    className="icon-img"
                    src={`${config.PROJECT_URL}/uploads/${service.image}`}
                    alt={service.header}
                  />
                </div>
                <a href="#" className="stretched-link">
                  <h3>{service.header}</h3>
                </a>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
