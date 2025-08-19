import React from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";

function AppNavbar({ search, setSearch, onOpenProfile }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">Student App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Students</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link onClick={onOpenProfile}>Build your Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Quick Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
