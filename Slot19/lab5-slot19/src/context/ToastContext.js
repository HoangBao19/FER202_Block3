import React, { createContext, useReducer, useCallback } from "react";

export const ToastContext = createContext();

let nextId = 1;
function toastReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback((message, variant = "success", delay = 2500) => {
    const id = nextId++;
    dispatch({ type: "ADD", payload: { id, message, variant } });
    setTimeout(() => dispatch({ type: "REMOVE", payload: id }), delay);
  }, []);

  const removeToast = (id) => dispatch({ type: "REMOVE", payload: id });

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
