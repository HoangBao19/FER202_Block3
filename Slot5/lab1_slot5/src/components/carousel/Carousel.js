import React, { useState, useEffect } from "react";

export default function Carousel({ slides = [], intervalMs = 5000 }) {
  const [idx, setIdx] = useState(0);
  const total = slides.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, intervalMs]);

  if (!total) return null;

  const slide = slides[idx];

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prev} aria-label="Previous slide">‹</button>
      <div className="carousel-track">
        <img src={slide.src} alt={slide.caption || `Slide ${idx + 1}`} />
        {slide.caption && <div className="carousel-caption">{slide.caption}</div>}
      </div>
      <button className="carousel-btn right" onClick={next} aria-label="Next slide">›</button>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}