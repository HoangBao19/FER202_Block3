import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import Toast from "./components/Toast";
import RequestForm from "./pages/RequestForm";
import { RECIPES } from "./data/recipes";
import "./App.css";

const HomePage = ({
  onView,
  filters,
  setFilters,
  recipes,
  onFav,
  favourites,
  page,
  setPage,
  perPage,
  setPerPage,
}) => (
  <>
    <Hero />
    <Filters filters={filters} setFilters={setFilters} />
    <RecipeGrid recipes={recipes} onView={onView} onFav={onFav} favourites={favourites} />
    <div className="container">
      <Pagination
        totalItems={recipes.total}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
      />
    </div>
  </>
);

const AboutPage = () => (
  <div className="container page-section">
    <h2>About</h2>
    <p>
      Healthy Recipe Finder là demo React giúp bạn tìm, lọc, sắp xếp, phân trang và xem nhanh công thức nấu ăn
      đơn giản, lành mạnh phù hợp thời gian thực tế.
    </p>
  </div>
);

export default function App() {
  const [filters, setFilters] = useState({
    q: "",
    maxPrep: "Any",
    maxCook: "Any",
    sortBy: "name-asc", // new
  });

  const [selected, setSelected] = useState(null);

  // favourites as a Set of recipe titles (or could be ids if you have)
  const [favourites, setFavourites] = useState(() => new Set());

  // toast state
  const [toast, setToast] = useState(null); // string | null

  // pagination state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6); // 6, 9, 12

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters.q, filters.maxCook, filters.maxPrep, filters.sortBy]);

  const filteredAndSorted = useMemo(() => {
    const maxPrep = filters.maxPrep === "Any" ? Infinity : Number(filters.maxPrep);
    const maxCook = filters.maxCook === "Any" ? Infinity : Number(filters.maxCook);
    const q = filters.q.trim().toLowerCase();

    let list = RECIPES.filter((r) => {
      const okPrep = r.prep <= maxPrep;
      const okCook = r.cook <= maxCook;
      const okQ =
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);
      return okPrep && okCook && okQ;
    });

    const compare = {
      "name-asc": (a, b) => a.title.localeCompare(b.title),
      "name-desc": (a, b) => b.title.localeCompare(a.title),
      "prep-asc": (a, b) => a.prep - b.prep || a.title.localeCompare(b.title),
      "prep-desc": (a, b) => b.prep - a.prep || a.title.localeCompare(b.title),
      "cook-asc": (a, b) => a.cook - b.cook || a.title.localeCompare(b.title),
      "cook-desc": (a, b) => b.cook - a.cook || a.title.localeCompare(b.title),
    }[filters.sortBy] || ((a, b) => a.title.localeCompare(b.title));

    list = [...list].sort(compare);

    return list;
  }, [filters]);

  // slice for pagination
  const total = filteredAndSorted.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paged = filteredAndSorted.slice(start, end);

  // handler: add to favourites with toast
  const handleAddFavourite = (recipe) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      next.add(recipe.title);
      return next;
    });
    setToast("Added to favourites");
  };

  // auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <div className="app">
      <Navbar favCount={favourites.size} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onView={setSelected}
                filters={filters}
                setFilters={setFilters}
                recipes={{ items: paged, total }}
                onFav={handleAddFavourite}
                favourites={favourites}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            }
          />
          <Route
            path="/recipes"
            element={
              <HomePage
                onView={setSelected}
                filters={filters}
                setFilters={setFilters}
                recipes={{ items: paged, total }}
                onFav={handleAddFavourite}
                favourites={favourites}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/request" element={<RequestForm />} />
        </Routes>
      </main>
      <Footer />

      {/* Modal xem chi tiết */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h3 className="modal-title">{selected.title}</h3>
          <p className="modal-desc">{selected.description}</p>
          <div className="modal-meta">
            <span>Servings: {selected.servings}</span>
            <span>Prep: {selected.prep} mins</span>
            <span>Cook: {selected.cook} mins</span>
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </Modal>
      )}

      <Toast open={!!toast} onClose={() => setToast(null)}>{toast}</Toast>
    </div>
  );
}