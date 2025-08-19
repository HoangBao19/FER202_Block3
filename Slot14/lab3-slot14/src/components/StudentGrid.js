import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students, onView }) {
  if (!students || students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <Row>
      {students.map((s) =>
        s ? (
          <Col key={s.id} xs={12} sm={6} lg={4} className="mb-3">
            <StudentCard student={s} onView={onView} />
          </Col>
        ) : null
      )}
    </Row>
  );
}
