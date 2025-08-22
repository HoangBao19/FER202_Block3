import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { products as data } from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Products() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let arr = data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const min = priceMin === "" ? -Infinity : Number(priceMin);
    const max = priceMax === "" ? Infinity : Number(priceMax);
    arr = arr.filter((p) => p.price >= min && p.price <= max);

    switch (sort) {
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      default:
        arr.sort((a, b) => a.name.localeCompare(b.name));
    }
    return arr;
  }, [query, sort, priceMin, priceMax]);

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Our Products</h2>
      </div>

      {/* Search & Filter Section */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <SearchBar
            query={query}
            setQuery={setQuery}
            sort={sort}
            setSort={setSort}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
          />
        </Card.Body>
      </Card>

      {/* No products */}
      {filtered.length === 0 && (
        <div className="alert alert-info shadow-sm">
          No products found. Please adjust your search or filter criteria.
        </div>
      )}

      {/* Products Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filtered.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
