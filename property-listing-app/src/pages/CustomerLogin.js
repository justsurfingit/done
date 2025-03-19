import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaHome } from "react-icons/fa";
import "./Login.css";

const CustomerLogin = ({ darkMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, hardcoded credentials
      if (username === "customer" && password === "password") {
        localStorage.setItem("userRole", "Customer");
        localStorage.setItem("isLoggedIn", "true");
        navigate("/explore");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className={`login-page ${darkMode ? "dark-theme" : ""}`}>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8} lg={6} xl={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="home-link">
                <FaHome /> Back to Home
              </Link>

              <Card className="login-card">
                <Card.Body className="p-5">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center mb-4">
                      <motion.div
                        className="avatar-circle mx-auto"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.3,
                        }}
                      >
                        <FaUser size={40} />
                      </motion.div>
                      <h2 className="mt-3 mb-1">Customer Login</h2>
                      <p className="text-muted">
                        Access your account to explore properties
                      </p>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="alert alert-danger"
                      >
                        {error}
                      </motion.div>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </Form.Group>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 py-2 mb-3"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Login"}
                        </Button>
                      </motion.div>
                    </Form>

                    <div className="text-center mt-4">
                      <p>
                        Don't have an account?{" "}
                        <Link to="/customer-signup" className="signup-link">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerLogin;
