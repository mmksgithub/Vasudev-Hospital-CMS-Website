import React from 'react';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported

const Stats = () => {
  return (
    <section id="stats" className="stats section light-background">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="row gy-4">
          
          {/* Stats Item for Doctors */}
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa-solid fa-user-doctor" />
            <div className="stats-item iconss">
              <div className="numbers">05</div>
              <p>Doctors</p>
            </div>
          </div>
          {/* End Stats Item */}

          {/* Stats Item for Departments */}
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fa-regular fa-hospital" />
            <div className="stats-item iconss">
              <div className="numbers">15</div>
              <p>Departments</p>
            </div>
          </div>
          {/* End Stats Item */}

          {/* Stats Item for Research Labs */}
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fas fa-flask" />
            <div className="stats-item iconss">
              <div className="numbers">8</div>
              <p>Research Labs</p>
            </div>
          </div>
          {/* End Stats Item */}

          {/* Stats Item for Awards */}
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="fas fa-award" />
            <div className="stats-item iconss">
              <div className="numbers">150</div>
              <p>Awards</p>
            </div>
          </div>
          {/* End Stats Item */}
          
        </div>
      </div>
    </section>
  );
};

export default Stats;
