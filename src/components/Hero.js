import { motion } from "framer-motion";


function Hero() {
  return (
    <section className="hero">

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <motion.span
          className="hero-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ✈️ Trusted Travel Partner
        </motion.span>

        <h1>
          Discover the World with <span>Keshri Travels</span>
        </h1>

        <p>
          Safe, comfortable, and affordable journeys crafted for unforgettable experiences across India and beyond.
        </p>

        <div className="hero-buttons">

          <motion.button
            className="hero-btn primary"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>

          <motion.button
            className="hero-btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Tours
          </motion.button>

        </div>

      </motion.div>

      {/* Decorative blur circles */}
      <div className="circle c1"></div>
      <div className="circle c2"></div>

    </section>
  );
}

export default Hero;