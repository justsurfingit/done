import React from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { FaBed, FaBath, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

const PropertyModal = ({ show, handleClose, property, darkMode }) => {
  if (!property) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      contentClassName={darkMode ? "bg-dark text-light" : ""}
    >
      <Modal.Header closeButton>
        <Modal.Title>{property.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={property.image_url}
          alt={property.name}
          className="w-100 mb-4 rounded"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />

        <Row className="mb-4">
          <Col md={6}>
            <h5 className="mb-3">Property Details</h5>
            <div className="d-flex align-items-center mb-2">
              <FaMapMarkerAlt className="me-2 text-primary" />
              <span>{property.location}</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaDollarSign className="me-2 text-success" />
              <span>${property.price}/month</span>
            </div>
          </Col>
          <Col md={6}>
            <h5 className="mb-3">Features</h5>
            <div className="d-flex align-items-center mb-2">
              <FaBed className="me-2 text-secondary" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaBath className="me-2 text-secondary" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
          </Col>
        </Row>

        <h5 className="mb-3">Description</h5>
        <p>
          This beautiful {property.name.toLowerCase()} is located in{" "}
          {property.location} and offers {property.bedrooms} bedrooms and{" "}
          {property.bathrooms} bathrooms. Perfect for those looking for comfort
          and convenience in a prime location.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Badge bg="primary" className="me-auto">
          Available Now
        </Badge>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant={darkMode ? "light" : "primary"}>Contact Agent</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertyModal;
