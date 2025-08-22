import React, { useContext, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(values);
    showToast("Login success", "success");
    navigate("/checkout", { replace: true });
  };

  return (
    <Container className="py-4" style={{ maxWidth: 520 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Login</h3>
          <Form onSubmit={onSubmit}>
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
              <Button type="submit">Login</Button>
              <span>
                No account? <Link to="/register">Register</Link>
              </span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
