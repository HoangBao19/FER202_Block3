import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

const AuthLayout = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="auth-layout">
      <header className="auth-header d-flex justify-content-between align-items-center">
        <Link to="/home" className="auth-back-link">
          ← Back to Shop
        </Link>
        <Button
          variant={isDarkMode ? "dark" : "light"}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Button>
      </header>
      <main className="auth-container">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
