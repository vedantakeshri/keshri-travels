import { motion } from "framer-motion";
import { FaPlane, FaShieldAlt, FaWallet } from "react-icons/fa";
// import "./About.css";

function About() {
  return (
    <section className="about-section">

      {/* Left Content */}
      <motion.div
        className="about-left"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-icon">
          <FaPlane />
        </div>

        <h2>About Keshri Travels</h2>

        <p>
          We provide safe, comfortable, and affordable travel experiences across India with trusted service and premium support.
        </p>

        <button className="about-btn">Learn More</button>
      </motion.div>

      {/* Right Features */}
      <motion.div
        className="about-right"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-card">
          <FaShieldAlt className="card-icon" />
          <h3>Safe Travel</h3>
          <p>Verified drivers and secure journey experience.</p>
        </div>

        <div className="about-card">
          <FaWallet className="card-icon" />
          <h3>Affordable Price</h3>
          <p>Best travel packages at budget-friendly rates.</p>
        </div>
      </motion.div>

    </section>
  );
}

export default About;