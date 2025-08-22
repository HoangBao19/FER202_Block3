import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { BagFill, HeartFill, PersonCircle } from "react-bootstrap-icons";

export default function NavBar() {
  const { totalCount } = useContext(CartContext);
  const { count: favCount } = useContext(FavouritesContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar bg={isDark ? "dark" : "light"} variant={isDark ? "dark" : "light"} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">FoodShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/register">Register account</Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-3">
            <Button variant={isDark ? "outline-light" : "outline-dark"} onClick={toggleTheme}>
              {isDark ? "Light" : "Dark"}
            </Button>

            <Nav.Link as={Link} to="/favourites" className="position-relative">
              <HeartFill size={20} />
              {favCount > 0 && (
                <Badge bg="danger" pill className="ms-1 align-middle">{favCount}</Badge>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="position-relative">
              <BagFill size={20} />
              {totalCount > 0 && (
                <Badge bg="primary" pill className="ms-1 align-middle">{totalCount}</Badge>
              )}
            </Nav.Link>

            <NavDropdown
              align="end"
              title={<span><PersonCircle size={22} /></span>}
              id="nav-profile-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/favourites">My Favourites</NavDropdown.Item>
              {!user && <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>}
              {user && <NavDropdown.Item onClick={() => { logout(); navigate("/"); }}>Logout</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
