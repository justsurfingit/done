import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Navbar,
  InputGroup,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaSearch,
  FaDollarSign,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ExploreProperties.css";

function ExploreProperties({ darkMode, toggleDarkMode }) {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [priceRange, setPriceRange] = useState(7000);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch properties from API
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://testbackend-8.onrender.com/api/properties")
      .then((res) => {
        setProperties(res.data);
        setFilteredProperties(res.data);
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setLoading(false));
  }, []);

  // Handle price range change
  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange(value);
  };

  // Filter properties based on price range and search term
  useEffect(() => {
    setFilteredProperties(
      properties.filter(
        (p) =>
          p.price <= priceRange &&
          (searchTerm === "" ||
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [priceRange, searchTerm, properties]);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/800x600?text=Property+Image";
  };

  // Handle opening the property details modal
  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  // Handle closing the property details modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="lg"
        className="shadow-sm py-3"
        style={{ padding: "0.8rem 1.5rem" }}
      >
        <Container>
          <Navbar.Brand
            href="/"
            className="fw-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
            }}
          >
            Premium Properties
          </Navbar.Brand>
          <Button
            variant={darkMode ? "light" : "dark"}
            className="ms-auto"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </Button>
        </Container>
      </Navbar>

      <Container fluid className="py-5">
        <h1 className="text-center mb-5 fw-bold main-title">
          Explore Premium Properties
        </h1>

        <Container className="mb-5">
          <Row className="g-4">
            <Col md={6}>
              <div className="search-container p-3 rounded-3 shadow-sm">
                <h5 className="mb-3 fw-bold">Search Properties</h5>
                <InputGroup className="search-input-group">
                  <InputGroup.Text className="search-icon">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md={6}>
              <div className="price-container p-3 rounded-3 shadow-sm">
                <h5 className="mb-3 fw-bold">Price Range</h5>
                <div className="price-range-labels d-flex justify-content-between mb-2">
                  <span>$500</span>
                  <span>$10,000</span>
                </div>
                <Form.Range
                  min={500}
                  max={10000}
                  step={500}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="price-slider mb-3"
                />
                <div className="text-center">
                  <Badge
                    bg="primary"
                    className="price-badge "
                    style={{ padding: "15px" }}
                  >
                    <FaDollarSign /> Maximum: ${priceRange.toLocaleString()}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h3 className="mt-3">Loading properties...</h3>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-5">
            <h3>No properties match your search criteria</h3>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProperties.map((property) => (
              <Col lg={4} md={6} key={property.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="property-card h-100 border-0">
                    <div className="property-image-container">
                      <Card.Img
                        variant="top"
                        src={property.image_url}
                        onError={handleImageError}
                        className="property-image"
                      />
                      <Badge bg="primary" className="property-price-badge">
                        ${property.price}/month
                      </Badge>
                    </div>
                    <Card.Body className="p-4">
                      <Card.Title className="property-title">
                        {property.name}
                      </Card.Title>
                      <Card.Text>
                        <div className="property-location">
                          <FaMapMarkerAlt className="location-icon" />{" "}
                          {property.location}
                        </div>
                        <div className="property-details">
                          <div className="property-beds">
                            <FaBed className="bed-icon" />
                            <span>{property.bedrooms} Beds</span>
                          </div>
                          <div className="property-baths">
                            <FaBath className="bath-icon" />
                            <span>{property.bathrooms} Baths</span>
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0 p-4 pt-0">
                      <Button
                        variant={darkMode ? "outline-light" : "primary"}
                        className="view-details-btn"
                        onClick={() => handleOpenModal(property)}
                      >
                        View Details
                      </Button>
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Property Details Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        contentClassName={darkMode ? "bg-dark text-light" : ""}
      >
        {selectedProperty && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProperty.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedProperty.image_url}
                alt={selectedProperty.name}
                className="w-100 mb-4 rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
                onError={handleImageError}
              />

              <Row className="mb-4">
                <Col md={6}>
                  <h5 className="mb-3">Property Details</h5>
                  <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="me-2 text-primary" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaDollarSign className="me-2 text-success" />
                    <span>${selectedProperty.price}/month</span>
                  </div>
                </Col>
                <Col md={6}>
                  <h5 className="mb-3">Features</h5>
                  <div className="d-flex align-items-center mb-2">
                    <FaBed className="me-2 text-secondary" />
                    <span>{selectedProperty.bedrooms} Bedrooms</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaBath className="me-2 text-secondary" />
                    <span>{selectedProperty.bathrooms} Bathrooms</span>
                  </div>
                </Col>
              </Row>

              <h5 className="mb-3">Description</h5>
              <p>
                This beautiful {selectedProperty.name.toLowerCase()} is located
                in {selectedProperty.location} and offers{" "}
                {selectedProperty.bedrooms} bedrooms and{" "}
                {selectedProperty.bathrooms} bathrooms. Perfect for those
                looking for comfort and convenience in a prime location.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Badge bg="primary" className="me-auto">
                Available Now
              </Badge>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant={darkMode ? "light" : "primary"}>
                Contact Agent
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default ExploreProperties;
