import { motion } from "framer-motion";


function Hero() {
  return (
    <section className="hero">

      {/* Background glow */}
      <div className="hero-bg"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >

        <motion.span
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          ✈️ Trusted Travel Partner
        </motion.span>

        <h1>
          Discover the World with <span>Keshri Travels</span>
        </h1>

        <p>
          Safe, comfortable, and affordable journeys crafted for unforgettable
          experiences across India and beyond.
        </p>

        <div className="hero-buttons">

          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>

          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Tours
          </motion.button>

        </div>

        {/* Stats */}
        <div className="hero-stats">

          <div className="stat">
            <h3>10K+</h3>
            <p>Happy Travelers</p>
          </div>

          <div className="stat">
            <h3>50+</h3>
            <p>Destinations</p>
          </div>

          <div className="stat">
            <h3>5★</h3>
            <p>Rated Service</p>
          </div>

        </div>

      </motion.div>

      {/* Decorative shapes */}
      <div className="circle c1"></div>
      <div className="circle c2"></div>

    </section>
  );
}

export default Hero;