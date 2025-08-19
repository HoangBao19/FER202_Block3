import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AddressForm({ values, onChange }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={values.country}
          onChange={(e) => onChange("country", e.target.value)}
          required
        >
          <option value="">Select Country</option>
          <option>Viet Nam</option>
          <option>Korea</option>
          <option>Italy</option>
          <option>USA</option>
          <option>Thailand</option>
          <option>Japan</option>
          <option>France</option>
          <option>Singapore</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={values.city}
          onChange={(e) => onChange("city", e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          value={values.street}
          onChange={(e) => onChange("street", e.target.value)}
          required
        />
      </Form.Group>

      {/* Thêm trường Street Number */}
      <Form.Group className="mb-3">
        <Form.Label>Street Number</Form.Label>
        <Form.Control
          type="number"
          value={values.streetNumber}
          onChange={(e) => onChange("streetNumber", e.target.value)}
          required
          min="1"
        />
      </Form.Group>
    </Form>
  );
}

AddressForm.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AddressForm;
