import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeroCarousel from "../components/Carousel/Carousel";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Container className="py-4">
        <h2 className="mb-3">Welcome to FoodShop</h2>
        <p>
          Discover tasty dishes and sweet desserts. Browse products to start
          adding to your cart!
        </p>

        <h3 className="mt-4 mb-3">Our Products</h3>
        <Row>
          {products.map((product) => (
            <Col
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex align-items-stretch mb-4"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
