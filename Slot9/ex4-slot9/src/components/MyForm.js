import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

// Trạng thái ban đầu
const initialState = {
  name: "",
  age: "",
  email: "",
  phone: "",
  gender: "",
  agree: false,
  isSubmitted: false,
};

// Reducer quản lý trạng thái form
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_AGREE":
      return { ...state, agree: !state.agree };
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    default:
      return state;
  }
};

const MyForm = ({ title, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleValidation = () => {
    const newErrors = {};

    // Tên
    if (!state.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (state.name.length < 3 || state.name.length > 50) {
      newErrors.name = "Tên phải từ 3-50 ký tự!";
    }

    // Tuổi
    if (!state.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(state.age) || state.age < 18 || state.age > 100) {
      newErrors.age = "Tuổi phải từ 18-100!";
    }

    // Email
    if (!state.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      newErrors.email = "Email không hợp lệ!";
    }

    // Số điện thoại
    if (!state.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!/^\d{10,15}$/.test(state.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10-15 chữ số!";
    }

    // Giới tính
    if (!state.gender) {
      newErrors.gender = "Vui lòng chọn giới tính!";
    }

    // Điều khoản
    if (!state.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      onSubmit(state);
    }
  };

  return (
    <Container>
      <h3>{title}</h3>

      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng kiểm tra các thông tin bên dưới.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Tên */}
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Tuổi */}
        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={state.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Số điện thoại */}
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Giới tính */}
        <Form.Group controlId="formGender" className="mt-3">
          <Form.Label>Giới tính</Form.Label>
          <div>
            <Form.Check
              inline
              label="Nam"
              name="gender"
              type="radio"
              value="Nam"
              checked={state.gender === "Nam"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              inline
              label="Nữ"
              name="gender"
              type="radio"
              value="Nữ"
              checked={state.gender === "Nữ"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
            <Form.Check
              inline
              label="Khác"
              name="gender"
              type="radio"
              value="Khác"
              checked={state.gender === "Khác"}
              onChange={handleChange}
              isInvalid={!!errors.gender}
            />
          </div>
          {errors.gender && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.gender}
            </div>
          )}
        </Form.Group>

        {/* Đồng ý điều khoản */}
        <Form.Group controlId="formAgree" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với điều khoản"
            checked={state.agree}
            onChange={() => dispatch({ type: "TOGGLE_AGREE" })}
            isInvalid={!!errors.agree}
          />
          {errors.agree && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.agree}
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Gửi
        </Button>
      </Form>
    </Container>
  );
};

MyForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MyForm;
