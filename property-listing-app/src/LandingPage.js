import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ darkMode }) => {
  return (
    <div className={`landing-page ${darkMode ? "dark-theme" : ""}`}>
      <div className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="hero-content">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-3 fw-bold mb-4">Find Your Dream Home</h1>
                <p className="lead mb-5">
                  Discover premium properties in top locations. Your perfect
                  home is just a click away.
                </p>

                <div className="d-flex flex-column flex-md-row gap-3">
                  <Link to="/customer-login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="explore-btn">
                        Explore as Customer
                      </Button>
                    </motion.div>
                  </Link>

                  <Link to="/dealer-login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" className="dealer-btn">
                        Join as Dealer
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury Home"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose Us</h2>
          <Row>
            {[
              {
                title: "Premium Locations",
                icon: "🌎",
                desc: "Properties in the most desirable neighborhoods",
              },
              {
                title: "Verified Listings",
                icon: "✓",
                desc: "All properties are verified for authenticity",
              },
              {
                title: "Expert Support",
                icon: "👨‍💼",
                desc: "Professional guidance throughout your journey",
              },
            ].map((feature, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <motion.div
                  className="feature-card text-center p-4"
                  whileHover={{ y: -10 }}
                >
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
