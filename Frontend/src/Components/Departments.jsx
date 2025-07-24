import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import config from '../../env';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // To manage active tabs

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/departments`); // Replace with your API URL
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // If there are no departments, display a loading message or error
  if (!departments.length) {
    return <p>Loading departments...</p>;
  }

  return (
    <section id="departments" className="departments section">
      
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Departments</h2>
        <p>Vasudev Hospital Departments</p>
      </div>
      {/* End Section Title */}

      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row">
          
          {/* Department Tabs */}
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              {departments.map((department, index) => (
                <li className="nav-item" key={department._id}>
                  <a
                    className={`nav-link ${index === activeTab ? 'active show' : ''}`}
                    data-bs-toggle="tab"
                    href={`#departments-tab-${index}`}
                    onClick={() => setActiveTab(index)}
                  >
                    {department.name} {/* Dynamically render department name */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* End Department Tabs */}

          {/* Department Content */}
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content">
              {departments.map((department, index) => (
                <div
                  className={`tab-pane ${index === activeTab ? 'active show' : ''}`}
                  id={`departments-tab-${index}`}
                  key={department._id}
                >
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>{department.name}</h3> {/* Render department name */}
                      <p className="fst-italic">{department.description}</p> {/* Render description */}
                    </div>
                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <img
                        src={`${config.PROJECT_URL}/uploads/${department.image}`} // Render image from API
                        alt={department.name}
                        className="img-fluid"
                      />
                                            

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End Department Content */}
          
        </div>
      </div>
    </section>
  );
};

export default Departments;
