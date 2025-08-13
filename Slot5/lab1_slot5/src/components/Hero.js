import React, { useMemo } from "react";
import Carousel from "./carousel/Carousel";
import { RECIPES } from "../data/recipes";

export default function Hero() {
  // pick first 5 images for carousel
  const slides = useMemo(
    () => RECIPES.slice(0, 5).map((r) => ({ src: r.image, caption: r.title })),
    []
  );

  return (
    <section className="hero">
      <div className="container">
        <h1>Explore our simple, healthy recipes</h1>
        <p className="muted">
          Discover eight quick, whole-food dishes. Use the controls below to browse highlights.
        </p>
        <Carousel slides={slides} />
      </div>
    </section>
  );
}