import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import axios from 'axios';
import config from '../../env';


const Links = () => {
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  // Fetch links from API
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/links`); // API endpoint to fetch social links
        setSocialLinks(response.data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="social-links d-none d-md-flex align-items-center ">
      <a href={socialLinks.twitter} className="twitter socicons" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-twitter" />
      </a>
      <a href={socialLinks.facebook} className="facebook socicons" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-facebook" />
      </a>
      <a href={socialLinks.instagram} className="instagram socicons" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-instagram" />
      </a>
      <a href={socialLinks.linkedin} className="linkedin socicons" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-linkedin" />
      </a>
    </div>
  );
};

export default Links;
