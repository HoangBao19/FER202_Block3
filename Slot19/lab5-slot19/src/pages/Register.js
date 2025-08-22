import React, { useContext, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(values);
    showToast("Register success", "success");
    navigate("/profile", { replace: true });
  };

  return (
    <Container className="py-4" style={{ maxWidth: 520 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Register</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                required
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <Button type="submit">Create account</Button>
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
