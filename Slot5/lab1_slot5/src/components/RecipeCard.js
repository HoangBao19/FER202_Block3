import React from "react";
import { FaHeart } from "react-icons/fa";

export default function RecipeCard({ recipe, onView, onFav, isFaved }) {
  return (
    <article className="card">
      <div className="card-img">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="card-body">
        <h3>{recipe.title}</h3>
        <p className="muted">{recipe.description}</p>
        <ul className="meta">
          <li>Servings: {recipe.servings}</li>
          <li>Prep: {recipe.prep} mins</li>
          <li>Cook: {recipe.cook} mins</li>
        </ul>
        <div className="card-actions">
          <button className="btn btn-ghost" onClick={onView}>View Recipe</button>
          <button className="btn btn-fav" onClick={onFav} disabled={isFaved}>
            <FaHeart className="icon-heart" /> {isFaved ? "Added" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}