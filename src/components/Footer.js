// import "./Footer.css";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-brand">
          <h3>Keshri Travels</h3>
          <p>
            Explore the world with comfort, safety, and unforgettable journeys.
          </p>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Follow Us</h4>

          <div className="icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
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