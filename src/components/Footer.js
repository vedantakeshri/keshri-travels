// import "./Footer.css";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

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
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <a href="#">Packages</a>
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