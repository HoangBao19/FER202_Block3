import React, { createContext, useReducer, useEffect } from "react";

export const FavouritesContext = createContext();

const initial = { ids: [] };

function favReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ids: action.payload || [] };
    case "TOGGLE": {
      const { id } = action.payload;
      return state.ids.includes(id)
        ? { ...state, ids: state.ids.filter((x) => x !== id) }
        : { ...state, ids: [...state.ids, id] };
    }
    case "CLEAR":
      return { ...state, ids: [] };
    default:
      return state;
  }
}

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favReducer, initial);

  useEffect(() => {
    const saved = localStorage.getItem("fav_ids");
    if (saved) dispatch({ type: "INIT", payload: JSON.parse(saved) });
  }, []);
  useEffect(() => {
    localStorage.setItem("fav_ids", JSON.stringify(state.ids));
  }, [state.ids]);

  const toggleFavourite = (product) => dispatch({ type: "TOGGLE", payload: { id: product.id } });
  const isFavourite = (id) => state.ids.includes(id);
  const count = state.ids.length;

  return (
    <FavouritesContext.Provider value={{ ids: state.ids, toggleFavourite, isFavourite, count }}>
      {children}
    </FavouritesContext.Provider>
  );
};
