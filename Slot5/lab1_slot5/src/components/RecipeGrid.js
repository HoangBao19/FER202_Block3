import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes, onView, onFav, favourites }) {
  const items = recipes.items || [];
  return (
    <section className="container grid">
      {items.map((r) => (
        <RecipeCard
          key={r.title}
          recipe={r}
          onView={() => onView(r)}
          onFav={() => onFav(r)}
          isFaved={favourites?.has(r.title)}
        />
      ))}
      {items.length === 0 && <p className="muted">No recipes match your filters.</p>}
    </section>
  );
}
