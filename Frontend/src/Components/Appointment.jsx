import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import config from "../../env"
const Appointment = () => {
  // State to hold fetched doctors
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.PROJECT_URL}/api/doctors`); // Fetch from API
      setDoctors(response.data); // Update state with fetched doctors
    } catch (error) {
      setError('Could not fetch doctors');
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section id="appointment" className="appointment section appi">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Appointment</h2>
        <p>Make Your Appointment Here</p>
      </div>
      
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <form action="forms/appointment.php" method="post" role="form" className="php-email-form">
          <div className="row">
            {/* Name Field */}
            <div className="col-md-4 form-group">
              <input
                type="text"
                name="name"
                className="form-control iapp"
                id="name"
                placeholder="Your Name"
                required
              />
            </div>
            {/* Email Field */}
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input
                type="email"
                className="form-control iapp"
                name="email"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
            {/* Phone Field */}
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input
                type="tel"
                className="form-control iapp"
                name="phone"
                id="phone"
                placeholder="Your Phone"
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Appointment Date Field */}
            <div className="col-md-4 form-group mt-3">
              <input
                type="datetime-local"
                name="date"
                className="form-control datepicker iapp"
                id="date"
                placeholder="Appointment Date"
                required
              />
            </div>
            {/* Department Field */}
            <div className="col-md-4 form-group mt-3">
              <select name="department" id="department" className="form-select iapp" required>
                <option value="">Select Department</option>
                <option value="Department 1">Cardiology</option>
                <option value="Department 2">Neurology</option>
                <option value="Department 3">Hepatology</option>
                <option value="Department 4">Pediatrics</option>
                <option value="Department 5">Eye Care</option>
              </select>
            </div>
            {/* Doctor Field */}
            <div className="col-md-4 form-group mt-3">
              <select name="doctor" id="doctor" className="form-select iapp" required>
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Field */}
          <div className="form-group mt-3">
            <textarea className="form-control iapp" name="message" rows={5} placeholder="Message (Optional)" />
          </div>

          {/* Submit Button */}
          <div className="mt-3">
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
            <div className="text-center">
              <button type="submit" className="appbut">Make an Appointment</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
