import React, { useState } from "react";
import "../App.css";

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

export default function CompanyList() {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = ["All", ...new Set(companies.map(c => c.category))];

  let filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "" || categoryFilter === "All" || c.category === categoryFilter)
  );

  if (sortOption === "startAsc") {
    filtered.sort((a, b) => a.start - b.start);
  } else if (sortOption === "startDesc") {
    filtered.sort((a, b) => b.start - a.start);
  } else if (sortOption === "duration") {
    filtered.sort((a, b) => (a.end - a.start) - (b.end - b.start));
  }

  return (
    <div>
      <h2>Company List</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search company name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch(search)}>Search</button>

        <select onChange={e => setSortOption(e.target.value)}>
          <option value="">-- Sort by --</option>
          <option value="startAsc">Year Start ↑</option>
          <option value="startDesc">Year Start ↓</option>
          <option value="duration">Duration (Short → Long)</option>
        </select>

        <select onChange={e => setCategoryFilter(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.category}</td>
                <td>{c.start}</td>
                <td>{c.end}</td>
                <td>{c.end - c.start} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No result</p>
      )}
    </div>
  );
}
