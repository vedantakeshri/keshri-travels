// import "./Footer.css";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h3>Keshri Travels</h3>
          <p>Explore the world with comfort, safety, and unforgettable journeys.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
<a href="#about">About</a>
<a href="#services">Services</a>
<a href="#contact">Contact</a>
<a href="#packages">Packages</a>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="icons">
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Keshri Travels. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;