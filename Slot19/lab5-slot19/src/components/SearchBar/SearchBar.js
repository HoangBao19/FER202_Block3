import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function SearchBar({ query, setQuery, sort, setSort, priceMin, setPriceMin, priceMax, setPriceMax }) {
  return (
    <Form className="mb-3">
      <Row className="g-2">
        <Col xs={12} md={4}>
          <Form.Control
            placeholder="Search by name or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
        <Col xs={6} md={3}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name-asc">Sort: Name ↑</option>
            <option value="name-desc">Sort: Name ↓</option>
            <option value="price-asc">Sort: Price ↑</option>
            <option value="price-desc">Sort: Price ↓</option>
          </Form.Select>
        </Col>
        <Col xs={3} md={2}>
          <Form.Control
            type="number"
            min={0}
            placeholder="Min $"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </Col>
        <Col xs={3} md={2}>
          <Form.Control
            type="number"
            min={0}
            placeholder="Max $"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  );
}
