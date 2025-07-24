import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Links from "./Links"
import config from '../../env';
import logo from "../../assets/img/vasudev-title-logo2.png";

const Footer = () => {
  // State to store the contact details fetched from the API
  const [contactData, setContactData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    primaryContact: "",
    primaryEmail: "",
    secondaryContact: "",
    secondaryEmail: ""
  });

  // Fetch the contact details from the API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/contact-us`);
        setContactData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching contact data for footer:", error);
      }
    };

    fetchContactData(); // Fetch the data on component mount
  }, []);

  return (
    <>
      <footer id="footer" className="footer light-background footer-body">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="" className="logo d-flex align-items-center">
                <img src={logo} alt="Vasudev Hospital Logo" className='footer-logo' />
                <span className="sitenamef">Vasudev Hospital</span>
              </a>
              <div className="footer-contact pt-3">
            
                <p className='address-info'>
                  {contactData.address || "Address not available"}<br />
                  {contactData.city || "City not available"}&nbsp;
                  {contactData.pincode || "Pincode not available"} &nbsp;
                  {contactData.state || "State not available"}
                  
                </p>

                <p className="mt-3">
                  <strong className='address-info'>Phone:</strong> <span className='address-info'>{contactData.primaryContact}</span>
                </p> {/* Primary Contact */}
                <p>
                  <strong className='address-info'>Email:</strong> <span className='address-info'>{contactData.primaryEmail}</span>
                </p> {/* Primary Email */}
                {/* Add secondary contact and email if needed */}
              </div>
              &nbsp;
              <Links/>
              
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className='links-heading'>Useful Links</h4>
              <ul>
                <li><a href="#" className='links-li'>Home</a></li>
                <li><a href="#" className='links-li'>About us</a></li>
                <li><a href="#" className='links-li'>Services</a></li>
                <li><a href="#" className='links-li'>Terms of service</a></li>
                <li><a href="#" className='links-li'>Privacy policy</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className='links-heading'>Our Services</h4>
              <ul>
                <li><a href="#" className='links-li'>Physiotherapy</a></li>
                <li><a href="#" className='links-li'>Ventilators</a></li>
                <li><a href="#" className='links-li'>
                
Insurance Facilities</a></li>
                <li><a href="#" className='links-li'>Spine Surgeries</a></li>
                <li><a href="#" className='links-li'>
                Trauma Care</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='hr' />
        <div className="container copyright text-center mt-4 footer-copyright">
          <p>
            <span>Copyright 2024 © </span>
            <strong className="px-1 footer-design">Vasudev Hospital</strong>
            <span> All Rights Reserved.</span>
          </p>
          <div className="credits footer-copyright">
            Designed by : <a href="https://technosoftdevelopment.com/" className="footer-design">TechnoSoftDevelopment</a>
          </div>
          <p>Cell : 9880314895 / 9060387886</p>
        </div>
      </footer>
      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
};

export default Footer;
