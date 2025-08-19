import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

function AccountForm({ values, onChange }) {
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  // Hàm validate từng field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) error = "Username is required";
        else if (value.length < 6) error = "Username must be at least 6 characters";
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(value)) error = "Password must include at least 1 uppercase letter";
        else if (!/[0-9]/.test(value)) error = "Password must include at least 1 number";
        else if (!/[!@#$%^&*]/.test(value))
          error = "Password must include at least 1 special character (!@#$%^&*)";
        break;

      case "confirmPassword":
        if (!value) error = "Confirm Password is required";
        else if (value !== values.password) error = "Passwords do not match";
        break;

      case "question":
        if (!value) error = "Please select a question";
        break;

      case "answer":
        if (!value) error = "Answer is required";
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
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
          isInvalid={!!errors.username}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showPw ? "text" : "password"}
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            isInvalid={!!errors.password}
            required
          />
          <InputGroup.Text
            role="button"
            onClick={() => setShowPw(!showPw)}
            style={{ cursor: "pointer" }}
          >
            {showPw ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={values.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          isInvalid={!!errors.confirmPassword}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      {/* Secret Question */}
      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={values.question}
          onChange={(e) => handleChange("question", e.target.value)}
          isInvalid={!!errors.question}
          required
        >
          <option value="">Choose...</option>
          <option>What is your first pet’s name?</option>
          <option>What is your mother’s maiden name?</option>
          <option>In which city were you born?</option>
          <option>Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.question}</Form.Control.Feedback>
      </Form.Group>

      {/* Answer */}
      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={values.answer}
          onChange={(e) => handleChange("answer", e.target.value)}
          isInvalid={!!errors.answer}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AccountForm.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AccountForm;
