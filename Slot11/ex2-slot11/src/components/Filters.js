import React from "react";
import { Form } from "react-bootstrap";

export default function Filters({ ageFilter, setAgeFilter, hasAvatar, setHasAvatar }) {
  return (
    <Form className="my-3 d-flex gap-3 flex-wrap">
      <Form.Select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
        <option value="">All ages</option>
        <option value="<=20">&lt;= 20</option>
        <option value="21-25">21 - 25</option>
        <option value=">25">&gt; 25</option>
      </Form.Select>

      <Form.Check
        type="checkbox"
        label="Has avatar"
        checked={hasAvatar}
        onChange={(e) => setHasAvatar(e.target.checked)}
      />
    </Form>
  );
}
