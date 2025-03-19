import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaHome, FaSignOutAlt } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = ({ darkMode, toggleDarkMode }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch properties from API
    fetch("http://localhost:5000/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      fetch(`http://localhost:5000/api/properties/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setProperties(properties.filter((property) => property.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting property:", error);
        });
    }
  };

  return (
    <div className={`admin-dashboard ${darkMode ? "dark-theme" : ""}`}>
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/properties">Properties</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/" className="home-link">
              <FaHome /> View Site
            </Link>
          </li>
          <li>
            <Button
              variant="link"
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </Button>
          </li>
        </ul>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="header-actions">
            <Button
              variant={darkMode ? "light" : "dark"}
              onClick={toggleDarkMode}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>

        <Container fluid>
          <Row className="stats-row">
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="stats-card">
                  <Card.Body>
                    <h3>Total Properties</h3>
                    <p className="stats-number">{properties.length}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="stats-card">
                  <Card.Body>
                    <h3>Total Users</h3>
                    <p className="stats-number">24</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="stats-card">
                  <Card.Body>
                    <h3>New Inquiries</h3>
                    <p className="stats-number">7</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4>Recent Properties</h4>
                  <Link to="/admin/add-property">
                    <Button variant="primary" size="sm">
                      <FaPlus /> Add Property
                    </Button>
                  </Link>
                </Card.Header>
                <Card.Body>
                  {loading ? (
                    <div className="text-center py-4">
                      Loading properties...
                    </div>
                  ) : (
                    <Table responsive striped hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Location</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.slice(0, 5).map((property) => (
                          <tr key={property.id}>
                            <td>{property.id}</td>
                            <td>{property.name}</td>
                            <td>{property.location}</td>
                            <td>${property.price}/month</td>
                            <td>
                              <Link to={`/admin/edit-property/${property.id}`}>
                                <Button
                                  variant="info"
                                  size="sm"
                                  className="me-2"
                                >
                                  <FaEdit />
                                </Button>
                              </Link>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleDeleteProperty(property.id)
                                }
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
