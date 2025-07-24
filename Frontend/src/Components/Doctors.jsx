import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import axios from 'axios';
import config from '../../env';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // State to hold doctor data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch doctors data from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.PROJECT_URL}/api/doctors`); // Your API endpoint
      console.log(response.data); // Log the response data
      setDoctors(response.data); // Set the fetched data to state
    } catch (error) {
      setError('Could not fetch doctors'); // Set an error message if the fetch fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchDoctors(); // Call the fetch function when component mounts
  }, []);

  // Show loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section id="doctors" className="doctors section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Doctors</h2>
        <p>Doctor's Team in Vasudev Hospital</p>
      </div>

      <div className="container">
        <div className="row gy-4 justify-content-center">
          {doctors.map((doctor, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 d-flex" data-aos="fade-up" data-aos-delay={`${index * 100}`} key={doctor.id}>
              <div className="member">
<img src={`${config.PROJECT_URL}/${doctor.photo}`} alt={doctor.name}  className="img-fluid" 
                /> 
                <h4>{doctor.name}</h4>
                <span>{doctor.qualification}</span>
                <div className="social">
                  <a href="#"><i className="bi bi-twitter-x"></i></a>
                  <a href="#"><i className="bi bi-facebook"></i></a>
                  <a href="#"><i className="bi bi-instagram"></i></a>
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;





















