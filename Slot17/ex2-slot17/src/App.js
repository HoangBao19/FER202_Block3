import React, { useState, useEffect } from "react";
import { CartProvider } from "./CartContext";
import DishesList from "./DishesList";
import Cart from "./Cart";
import "./App.css";

// Sample dishes array
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 👉 Gắn class "dark" vào body thay vì chỉ <div>
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      <div className="App">
        <h1>🍽 Food Ordering</h1>

        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <input
          type="text"
          placeholder="Tìm món ăn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        <DishesList dishes={filteredDishes} />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
