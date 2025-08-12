import React, { useState, useMemo } from "react";
import { persons } from "./data/person";
import "./App.css";

function App() {
  // --- Part 1: Sort First Name ---
  const [sortAZ, setSortAZ] = useState(true);
  const sortedByFirstName = [...persons].sort((a, b) =>
    sortAZ ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName)
  );

  // --- Part 2: Filter by Age + Skill ---
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const skillsList = [...new Set(persons.flatMap(p => p.skills))];

  const filteredByAgeSkill = persons.filter(p => {
    const inAge = (!minAge || p.age >= +minAge) && (!maxAge || p.age <= +maxAge);
    const inSkill = !skillFilter || p.skills.includes(skillFilter);
    return inAge && inSkill;
  });

  // --- Part 3: Skill Ranking ---
  const skillCount = persons.reduce((acc, p) => {
    p.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const skillRanking = Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1]);
  const topCount = skillRanking[0]?.[1];

  // --- Part 4: Search + Multi Sort + Statistics ---
  const [searchName, setSearchName] = useState("");
  const filteredAndSorted = useMemo(() => {
    return persons
      .filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchName.toLowerCase()))
      .sort((a, b) => {
        if (a.isActive !== b.isActive) return b.isActive - a.isActive;
        if (a.age !== b.age) return a.age - b.age;
        return a.lastName.localeCompare(b.lastName);
      });
  }, [searchName]);

  const stats = useMemo(() => {
    const total = filteredAndSorted.length;
    const avgAge = total > 0 ? (filteredAndSorted.reduce((sum, p) => sum + p.age, 0) / total).toFixed(1) : 0;
    const activeCount = filteredAndSorted.filter(p => p.isActive).length;
    return { total, avgAge, activeCount };
  }, [filteredAndSorted]);

  return (
    <div className="App">
      <h1>Exercise 2</h1>

      {/* Part 1 */}
      <section>
        <h2>1. Sort First Name</h2>
        <button onClick={() => setSortAZ(!sortAZ)}>
          Sort First Name: {sortAZ ? "A → Z" : "Z → A"}
        </button>
        <ul>
          {sortedByFirstName.map(p => (
            <li key={p.id}>
              {p.firstName} {p.lastName} - {p.age} - {p.city} - Skills: {p.skills.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      {/* Part 2 */}
      <section>
        <h2>2. Filter by Age & Skill</h2>
        <input type="number" placeholder="Min age" value={minAge} onChange={e => setMinAge(e.target.value)} />
        <input type="number" placeholder="Max age" value={maxAge} onChange={e => setMaxAge(e.target.value)} />
        <select value={skillFilter} onChange={e => setSkillFilter(e.target.value)}>
          <option value="">All skills</option>
          {skillsList.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        {filteredByAgeSkill.length > 0 ? (
          <ul>
            {filteredByAgeSkill.map(p => (
              <li key={p.id}>
                {p.firstName} - {p.lastName} - Skills: {p.skills.join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p>No found</p>
        )}
      </section>

      {/* Part 3 */}
      <section>
        <h2>3. Skill Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRanking.map(([skill, count]) => (
              <tr key={skill} style={{ fontWeight: count === topCount ? "bold" : "normal" }}>
                <td>{skill}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Part 4 */}
      <section>
        <h2>4. Search & Multi Sort + Statistics</h2>
        <input
          type="text"
          placeholder="Search name..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <ul>
          {filteredAndSorted.map(p => (
            <li key={p.id}>
              {p.firstName} {p.lastName} - Age: {p.age} - Active: {p.isActive ? "Yes" : "No"}
            </li>
          ))}
        </ul>
        <div className="stats-box">
          <p>Total: {stats.total}</p>
          <p>Average Age: {stats.avgAge}</p>
          <p>Active Count: {stats.activeCount}</p>
        </div>
      </section>
    </div>
  );
}

export default App;
