import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import BuildProfileModal from "./components/BuildProfileModal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} onOpenProfile={() => setShowProfile(true)} />
      <StudentsPage search={search} />
      <Footer />
      <BuildProfileModal show={showProfile} handleClose={() => setShowProfile(false)} />
    </>
  );
}

export default App;
