import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import AOS from "aos";
import axios from "axios";
import GLightbox from "glightbox";
import Swiper from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Links from "./Links";
import config from "../../env";
import logo from "../../assets/img/vasudev-logo5.png";

const Header = () => {
  const [contactData, setContactData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    primaryContact: "",
    primaryEmail: "",
    secondaryContact: "",
    secondaryEmail: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          `${config.PROJECT_URL}/api/contact-us`
        );
        setContactData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching contact data for footer:", error);
      }
    };

    fetchContactData(); // Fetch the data on component mount
  }, []);

  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Initialize GLightbox
    const glightbox = GLightbox({
      selector: ".glightbox",
    });

    const initCarouselIndicators = () => {
      document
        .querySelectorAll(".carousel-indicators")
        .forEach((carouselIndicator) => {
          const carousel = carouselIndicator.closest(".carousel");
          if (carousel) {
            const carouselItems = carousel.querySelectorAll(".carousel-item");
            carouselItems.forEach((carouselItem, index) => {
              const indicator = document.createElement("li");
              indicator.setAttribute("data-bs-target", `#${carousel.id}`);
              indicator.setAttribute("data-bs-slide-to", `${index}`);
              if (index === 0) {
                indicator.classList.add("active");
              }
              carouselIndicator.appendChild(indicator);
            });
          }
        });
    };

    initCarouselIndicators();

    // Initialize Swiper
    const initSwiper = () => {
      document
        .querySelectorAll(".init-swiper")
        .forEach(function (swiperElement) {
          let config = JSON.parse(
            swiperElement.querySelector(".swiper-config").innerHTML.trim()
          );

          if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
          } else {
            new Swiper(swiperElement, config);
          }
        });
    };

    window.addEventListener("load", initSwiper);

    // Mobile nav toggle functionality
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
    const handleMobileNavToggle = () => {
      document.body.classList.toggle("mobile-nav-active");
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    };

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", handleMobileNavToggle);
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener("click", handleMobileNavToggle);
      }
      window.removeEventListener("load", initSwiper);
    };
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      {/* Favicons */}
      <link href="../../assets/img/favicon.png" rel="icon" />
      <link
        href="../../assets/img/apple-touch-icon.png"
        rel="apple-touch-icon"
      />
      {/* Fonts */}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      {/* Vendor CSS Files */}
      <link
        href="../../assets/vendor/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link href="../../assets/vendor/aos/aos.css" rel="stylesheet" />
      <link
        href="../../assets/vendor/fontawesome-free/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="../../assets/vendor/glightbox/css/glightbox.min.css"
        rel="stylesheet"
      />
      <link
        href="../../assets/vendor/swiper/swiper-bundle.min.css"
        rel="stylesheet"
      />
      {/* Main CSS File */}
      {/* ======================================================= */}
      {/* Template Name: Marhama */}
      {/* ======================================================= */}
      <header id="header" className="header sticky-top">
        <div className="topbar d-flex align-items-center icons">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className=" head contact-info d-flex align-items-center ">
              <i className="bi bi-envelope d-flex align-items-center icons logo-name">
                <a className="icons" href="mailto:mmhospital@gmail.com">
                  {contactData.primaryEmail}
                </a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4 icons">
                <span className="icons">{contactData.primaryContact}</span>
                <Link
                  to="https://admin.vasudevhealthcare.com/login"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
                </Link>{" "}
                {/* Login button */}
              </i>
            </div>

            <Links />
          </div>
        </div>
        {/* End Top Bar */}
        <div className="branding d-flex align-items-center icons">
          <div className="container position-relative d-flex align-items-center justify-content-between icons">
            <a
              href="/"
              className="logo d-flex align-items-center me-auto icons logo-name"
            >
              <img src={logo} alt="" className="mainimg" />
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <a href="#hero">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#departments">Departments</a>
                </li>
                <li>
                  <a href="#doctors">Doctors</a>
                </li>
                <li>
                  <a href="#gallery">Gallery</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
            <a
              className="cta-btn d-none d-sm-block app make"
              href="#appointment"
            >
              Make an Appointment
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
