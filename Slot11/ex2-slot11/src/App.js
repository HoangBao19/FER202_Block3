import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <StudentsPage search={search} />
      <Footer />
    </>
  );
}

export default App;
