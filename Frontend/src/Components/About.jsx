import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faAtom } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import config from '../../env';

const About = () => {
  const [aboutData, setAboutData] = useState({
    header: '',
    description: '',
    vision: '',
    mission: '',
    image: ''
  });

  // Fetch the existing About Us data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/about-us`);
        setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching About Us data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="about section abs">
      <div className="container">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
          <p>About us will help you pay for medical emergencies, hospitalisation, contraction of any illnesses and treatment, and medical care required in the future.</p>
        </div>

        <div className="row gy-4 gx-5">
          {/* Image Section */}
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {aboutData.image && (
              <img
                src={`${config.PROJECT_URL}/uploads/${aboutData.image}`} // Correct image URL
                alt="About Us"
                className="img-fluid"
                // Responsive image
              />
            )}
          </div>

          {/* Content Section */}
          <div
            className="col-lg-6 content"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <div>
              <h2>{aboutData.header || 'Welcome to Anantha Vasudev Hospital'}</h2>
              <p>{aboutData.description || 'Comprehensive & Quality Health Care At Affordable cost.'}</p>
            </div>

            <ul>
              <br />
              <li>
                <FontAwesomeIcon icon={faCube} className="vission-icon" />
                <div>
                  <h5>OUR VISION</h5>
                  <p>{aboutData.vision || 'To be the community\'s trusted leader in healthcare services.'}</p>
                </div>
              </li>
              <br />
              <li>
                <FontAwesomeIcon icon={faAtom} className="vission-icon" />
                <div>
                  <h5>OUR MISSION</h5>
                  <p>{aboutData.mission || 'Committed to improving the health of the people we serve.'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
