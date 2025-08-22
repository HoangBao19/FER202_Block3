import React from "react";
import { Container, Alert } from "react-bootstrap";

export default function Checkout() {
  return (
    <Container className="py-4">
      <h2 className="mb-3">Checkout</h2>
      <Alert variant="success">
        This is a demo checkout page. Implement your payment workflow here.
      </Alert>
    </Container>
  );
}
