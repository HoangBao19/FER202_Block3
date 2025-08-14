import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfile";
import NameList from "./components/NameList";
import StudentCard from "./components/StudentCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const userData = { name: "Hoang Gia Bao", age: 20 };
  const namesList = ["baohgde180037@fpt.edu.vn", "test@fe.edu.vn"];

  const students = [
    { name: "Lionel Messi", age: 38, avatar: "/images/student1.jpg" },
    { name: "Cristiano Ronaldo", age: 40, avatar: "/images/student2.jpg" },
    { name: "Neymar Jr.", age: 33, avatar: "/images/student3.jpg" },
  ];

  return (
    <>
      <Welcome name={userData.name} />
      <UserProfile user={userData} />
      <NameList names={namesList} />

      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row className="justify-content-center">
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4} lg={3} className="d-flex justify-content-center">
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
