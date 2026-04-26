import { motion } from "framer-motion";


function Testimonials() {
  const reviews = [
    {
      name: "Amit Sharma",
      text: "Amazing travel experience with Keshri Travels! Everything was smooth and well organized.",
    },
    {
      name: "Ravi Kumar",
      text: "Very comfortable and affordable service. Highly recommended for family trips.",
    },
    {
      name: "Pooja Verma",
      text: "Best travel agency I’ve used so far. Great support and punctual service.",
    },
  ];

  return (
    <section className="testimonials-section">

      {/* Heading */}
      <motion.h2
        className="testimonials-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What Our Customers Say
      </motion.h2>

      <motion.p
        className="testimonials-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Real feedback from happy travelers across India.
      </motion.p>

      {/* Cards */}
      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -8 }}
          >

            <div className="quote">“</div>

            <p className="review-text">{r.text}</p>

            <div className="user">
              <div className="avatar">
                {r.name.charAt(0)}
              </div>
              <h4>{r.name}</h4>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Testimonials;