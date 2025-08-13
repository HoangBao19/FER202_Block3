import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const TIME_OPTIONS = ["Any", 5, 10, 12, 15, 20, 30];

export default function Filters({ filters, setFilters }) {
  const [localQ, setLocalQ] = useState(filters.q);
  const debouncedQ = useDebounce(localQ, 300);

  useEffect(() => {
    setFilters((f) => ({ ...f, q: debouncedQ }));
  }, [debouncedQ, setFilters]);

  return (
    <section className="filters">
      <div className="container filters-inner">
        <div className="selects">
          <label>
            Max Prep Time
            <select
              value={filters.maxPrep}
              onChange={(e) => setFilters((f) => ({ ...f, maxPrep: e.target.value }))}
            >
              {TIME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label>
            Max Cook Time
            <select
              value={filters.maxCook}
              onChange={(e) => setFilters((f) => ({ ...f, maxCook: e.target.value }))}
            >
              {TIME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
            >
              <option value="name-asc">Name A→Z</option>
              <option value="name-desc">Name Z→A</option>
              <option value="prep-asc">Prep ↑</option>
              <option value="prep-desc">Prep ↓</option>
              <option value="cook-asc">Cook ↑</option>
              <option value="cook-desc">Cook ↓</option>
            </select>
          </label>
        </div>

        <input
          className="search"
          placeholder="Search by name or ingredient…"
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
        />
      </div>
    </section>
  );
}