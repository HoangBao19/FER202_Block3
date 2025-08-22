import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === id);

  const { addToCart } = useContext(CartContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);
  const { showToast } = useContext(ToastContext);

  if (!product) return <Container className="py-5">Product not found</Container>;

  const fav = isFavourite(product.id);

  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* Product Image */}
        <Col md={6} className="d-flex justify-content-center">
          <Card className="shadow-sm border-0 p-3">
            <Image
              src={product.image}
              fluid
              rounded
              style={{ maxHeight: 400, objectFit: "cover" }}
            />
          </Card>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <Card className="shadow-sm border-0 p-4 h-100">
            <Card.Body>
              <h2 className="fw-bold mb-3">{product.name}</h2>
              <h4 className="text-primary fw-semibold mb-3">
                ${product.price.toFixed(2)}
              </h4>
              <p className="text-muted mb-4">{product.description}</p>

              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    addToCart(product);
                    showToast("Added to cart", "success");
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant={fav ? "secondary" : "outline-danger"}
                  size="lg"
                  onClick={() => {
                    if (fav) {
                      navigate("/favourites");
                      return;
                    }
                    toggleFavourite(product);
                    showToast("Added to favourites", "info");
                  }}
                >
                  {fav ? "Browse to My Favourite" : "Add to Favourite"}
                </Button>

                <Button as={Link} to="/products" variant="outline-secondary" size="lg">
                  Back to List
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
