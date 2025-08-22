import React, { createContext, useReducer, useMemo, useEffect } from "react";

export const CartContext = createContext();

const initialState = {
  items: [], // {id, name, price, image, qty}
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, items: action.payload || [] };
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // persist
  useEffect(() => {
    const saved = localStorage.getItem("cart_items");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalCount = useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  );
  const totalValue = useMemo(
    () => state.items.reduce((s, i) => s + i.qty * Number(i.price), 0).toFixed(2),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addToCart, removeFromCart, updateQty, clearCart, totalCount, totalValue }}
    >
      {children}
    </CartContext.Provider>
  );
};
