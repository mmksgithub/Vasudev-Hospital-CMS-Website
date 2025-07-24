import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import axios from 'axios';
import config from '../../env';


const Contact = () => {
  const [contactData, setContactData] = useState({
    city: '',
    state: '',
    pincode: '',
    primaryEmail: '',
    secondaryEmail: '',
    primaryContact: '',
    secondaryContact: '',
    address: '',
  });

  // Fetch contact data from the backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/contact-us`);
        setContactData(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  return (
    <section id="contact" className="contact section conus">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Contact Us</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0 coni" />
              <div>
                <h3>Location</h3>
                <p>
                  {contactData.address || "Address not available"}<br />
                  {contactData.city || "City not available"}&nbsp;
                  {contactData.pincode || "Pincode not available"} &nbsp;
                  {contactData.state || "State not available"}
                  
                </p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0 coni" />
              <div>
                <h3>Call Us</h3>
                <p>{contactData.primaryContact || "Primary Contact not available"}&nbsp;/&nbsp;{contactData.secondaryContact || "Secondary Contact not available"}</p>
              </div>
            </div>

            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0 coni" />
              <div>
                <h3>Email Us</h3>
                <p>{contactData.primaryEmail || "Primary Email not available"}</p>
                <p>{contactData.secondaryEmail || "Secondary Email not available"}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            {/* Contact Form */}
            <form
              action="forms/contact.php"
              method="post"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control capp"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control capp"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control capp"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    className="form-control capp"
                    name="message"
                    rows={6}
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                  <button type="submit" className="conbut">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
            {/* End Contact Form */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
