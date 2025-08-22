import React from "react";
import { Carousel } from "react-bootstrap";

const slides = [
  { src: "/images/slide1.jpg", caption: "Fresh & Tasty", text: "Delicious dishes every day" },
  { src: "/images/slide2.jpg", caption: "Hot Deals", text: "Save more with combos" },
  { src: "/images/slide3.jpg", caption: "Sweet Desserts", text: "Finish with a smile" },
];

export default function HeroCarousel() {
  return (
    <Carousel controls indicators fade interval={3000} pause="hover">
      {slides.map((s, idx) => (
        <Carousel.Item key={idx}>
          <img src={s.src} className="d-block w-100" alt={`slide-${idx}`} />
          <Carousel.Caption>
            <h3>{s.caption}</h3>
            <p>{s.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
