import { motion } from "framer-motion";
import { FaBus, FaHotel, FaMapMarkedAlt } from "react-icons/fa";
// import "./Features.css";

function Features() {
  const data = [
    {
      icon: <FaBus />,
      title: "Bus Booking",
      desc: "Comfortable AC & Non-AC buses with safe and reliable travel experience.",
    },
    {
      icon: <FaHotel />,
      title: "Hotel Stay",
      desc: "Handpicked hotels with best pricing, comfort, and premium services.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Tour Packages",
      desc: "Custom travel packages designed for families, couples, and groups.",
    },
  ];

  return (
    <section className="features-section">

      {/* Heading */}
      <motion.h2
        className="features-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h2>

      <motion.p
        className="features-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Everything you need for a smooth and memorable travel experience.
      </motion.p>

      {/* Cards */}
      <div className="features-grid">
        {data.map((item, i) => (
          <motion.div
            key={i}
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <div className="icon-box">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <div className="card-glow"></div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Features;