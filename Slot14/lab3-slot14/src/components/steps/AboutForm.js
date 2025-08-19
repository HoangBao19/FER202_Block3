import React, { useState, useEffect } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import PropTypes from "prop-types";

function AboutForm({ values, onChange }) {
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (values.avatar) {
      const objectUrl = URL.createObjectURL(values.avatar);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // cleanup tránh leak bộ nhớ
    } else {
      setPreview(null);
    }
  }, [values.avatar]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value) error = "First name is required";
        else if (value.length < 2) error = "First name must be at least 2 characters";
        break;

      case "lastName":
        if (!value) error = "Last name is required";
        else if (value.length < 2) error = "Last name must be at least 2 characters";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;

      case "avatar":
        if (!value) error = "Avatar is required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name, value) => {
    onChange(name, value);
    validateField(name, value);
  };

  return (
    <Form>
      <Row>
        {/* Avatar Preview bên trái */}
        <Col md={4} className="d-flex flex-column align-items-center">
          <div
            style={{
              width: "150px",
              height: "150px",
              border: "2px dashed #ccc",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            {preview ? (
              <Image src={preview} alt="avatar preview" fluid />
            ) : (
              <span style={{ color: "#999" }}>No Image</span>
            )}
          </div>
          <Form.Label style={{ fontWeight: "bold" }}>Choose Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => handleChange("avatar", e.target.files[0])}
            isInvalid={!!errors.avatar}
            required
          />
          <Form.Control.Feedback type="invalid">{errors.avatar}</Form.Control.Feedback>
        </Col>

        {/* Form nhập liệu bên phải */}
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={values.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Enter your first name"
              isInvalid={!!errors.firstName}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={values.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Enter your last name"
              isInvalid={!!errors.lastName}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={values.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

AboutForm.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AboutForm;
