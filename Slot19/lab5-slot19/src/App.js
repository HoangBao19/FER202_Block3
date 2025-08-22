import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { ToastProvider } from "./context/ToastContext";
import NavBar from "./components/NavBar/NavBar";
import ToastHost from "./components/Toast/Toast";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <FavouritesProvider>
              <ToastProvider>
                <NavBar />
                <AppRoutes />
                <ToastHost />
              </ToastProvider>
            </FavouritesProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
