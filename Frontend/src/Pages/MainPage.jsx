import React from 'react';
import Header from '../Components/Header.jsx';
import Hero from '../Components/Hero.jsx';
import About from '../Components/About';
import Stats from '../Components/Stats';
import Services from '../Components/Services';
import Appointment from '../Components/Appointment';
import Departments from '../Components/Departments.jsx';
import Doctors from '../Components/Doctors';
import Gallery from '../Components/Gallery';
import Contact from '../Components/Contact';
import AddLocation from '../Components/AddLocation';
import Footer from '../Components/Footer';

const MainPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Stats/>
      <Services />
      <Appointment/>
            <Departments/>
      <Doctors />
      <Gallery />
      <Contact />
      <AddLocation/>
      <Footer />
    </>
  );
};

export default MainPage;
