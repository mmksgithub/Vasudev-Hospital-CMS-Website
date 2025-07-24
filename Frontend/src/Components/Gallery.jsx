import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'aos/dist/aos.css'; // Ensure AOS styles are imported
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../env';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from the backend API
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${config.PROJECT_URL}/api/photos`); // Assuming this is your API endpoint
        setPhotos(response.data); // Store the photos in the state
      } catch (error) {
        console.error('Error fetching photos:', error);
        toast.error("Failed to load the gallery. Please try again.");
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <section id="gallery" className="gallery section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Hospital Photo Gallery</p>
      </div>

      {/* End Section Title */}
      <ToastContainer position="top-center" />

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div key={index} className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href={`${config.PROJECT_URL}/${photo.filePath}`} // Adjust the path based on how you're serving static files
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src={`${config.PROJECT_URL}/${photo.filePath}`} // Ensure correct path for serving uploaded files
                      alt={`Gallery Item ${index + 1}`}
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No photos available in the gallery.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
