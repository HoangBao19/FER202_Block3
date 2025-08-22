import React, { useContext, useMemo } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { FavouritesContext } from "../context/FavouritesContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";

export default function MyFavourites() {
  const { ids } = useContext(FavouritesContext);

  const favProducts = useMemo(() => products.filter((p) => ids.includes(p.id)), [ids]);

  return (
    <Container className="py-4">
      <h2 className="mb-3">My Favourites</h2>
      {favProducts.length === 0 ? (
        <Alert variant="info">You haven't added any favourites yet.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {favProducts.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
