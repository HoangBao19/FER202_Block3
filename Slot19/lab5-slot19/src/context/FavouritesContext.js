import React, { createContext, useReducer } from "react";

export const FavouritesContext = createContext();

const initial = { ids: [] };

function favReducer(state, action) {
  switch (action.type) {
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

  const toggleFavourite = (product) =>
    dispatch({ type: "TOGGLE", payload: { id: product.id } });
  const isFavourite = (id) => state.ids.includes(id);
  const count = state.ids.length;

  return (
    <FavouritesContext.Provider
      value={{ ids: state.ids, toggleFavourite, isFavourite, count }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
