import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export default function StudentCard({ student, onView }) {
  return (
    <Card>
      {student.avatar && student.avatar.trim() !== "" ? (
        <Card.Img
          variant="top"
          src={student.avatar}
          alt={student.name || "No name"}
        />
      ) : (
        <div style={{ height: "200px", background: "#eee" }}>
          <p className="text-center mt-5">No Avatar</p>
        </div>
      )}
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {student.email} <br />
          <strong>Age:</strong> {student.age}
        </Card.Text>
        <Button onClick={() => onView(student)}>View Details</Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
};
