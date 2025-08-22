import React, { useContext } from "react";
import { Container, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <Container className="py-4" style={{ maxWidth: 640 }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Profile</h3>
          {!user ? (
            <p>Please login first.</p>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
