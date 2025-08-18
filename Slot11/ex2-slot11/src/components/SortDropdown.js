import React from "react";
import { Dropdown } from "react-bootstrap";

export default function SortDropdown({ sort, setSort }) {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary">Sort</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSort("ageAsc")}>Age ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("ageDesc")}>Age ↓</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("nameAsc")}>Name A→Z</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("nameDesc")}>Name Z→A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
