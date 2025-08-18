import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { students as data } from "../data/students";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal";

export default function StudentsPage({ search }) {
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sort, setSort] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let result = [...data];

    // 🔍 search theo tên hoặc email
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.email.toLowerCase().includes(lower)
      );
    }

    // 🎯 lọc theo tuổi
    if (ageFilter) {
      if (ageFilter === "<=20") result = result.filter((s) => s.age <= 20);
      if (ageFilter === "21-25")
        result = result.filter((s) => s.age >= 21 && s.age <= 25);
      if (ageFilter === ">25") result = result.filter((s) => s.age > 25);
    }

    // 🖼 lọc theo avatar
    if (hasAvatar) {
      result = result.filter(
        (s) => typeof s.avatar === "string" && s.avatar.trim() !== ""
      );
    }
    // nếu không tick thì không lọc, show tất cả kể cả avatar null

    // ⬆ sắp xếp
    if (sort === "ageAsc") result.sort((a, b) => a.age - b.age);
    if (sort === "ageDesc") result.sort((a, b) => b.age - a.age);
    if (sort === "nameAsc") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "nameDesc") result.sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [search, ageFilter, hasAvatar, sort]);

  return (
    <Container className="my-4">
      <h2>Student Management</h2>
      <p>Manage students with filters, sorting and details view.</p>

      <Filters
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        hasAvatar={hasAvatar}
        setHasAvatar={setHasAvatar}
      />
      <SortDropdown sort={sort} setSort={setSort} />

      <StudentGrid students={filtered} onView={(s) => setSelected(s)} />

      <StudentDetailModal
        show={!!selected}
        student={selected}
        handleClose={() => setSelected(null)}
      />
    </Container>
  );
}
