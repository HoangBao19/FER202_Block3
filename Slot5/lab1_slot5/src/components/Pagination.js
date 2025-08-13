import React, { useMemo } from "react";

export default function Pagination({ totalItems, page, setPage, perPage, setPerPage }) {
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / perPage));
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  return (
    <div className="pagination-row">
      <div className="items-per-page">
        <label>
          Items per page
          <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </label>
      </div>

      <div className="paginator">
        <button className="btn" onClick={goFirst} disabled={page === 1}>&laquo;&laquo;</button>
        <button className="btn" onClick={goPrev} disabled={page === 1}>&laquo;</button>
        {pages.map((n) => (
          <button
            key={n}
            className={`btn page-btn ${page === n ? "active" : ""}`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        <button className="btn" onClick={goNext} disabled={page === totalPages}>&raquo;</button>
        <button className="btn" onClick={goLast} disabled={page === totalPages}>&raquo;&raquo;</button>
      </div>
    </div>
  );
}