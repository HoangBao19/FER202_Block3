import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FavouritesContext } from "../../context/FavouritesContext";
import { ToastContext } from "../../context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleFavourite, isFavourite } = useContext(FavouritesContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const fav = isFavourite(product.id);

  const onAddCart = () => {
    addToCart(product);
    showToast("Added to cart", "success");
  };

  const onFavClick = () => {
    if (fav) {
      navigate("/favourites");
      return;
    }
    toggleFavourite(product);
    showToast("Added to favourites", "info");
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.image} alt={product.name} style={{ objectFit: "cover", height: 180 }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{product.name}</Card.Title>
        <Card.Text className="text-muted mb-3">${Number(product.price).toFixed(2)}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Button variant="outline-primary" onClick={() => navigate(`/products/${product.id}`)}>
            View Details
          </Button>
          <Button variant="primary" onClick={onAddCart}>Add to Cart</Button>
          <Button variant={fav ? "secondary" : "outline-danger"} onClick={onFavClick}>
            {fav ? "Browse to My Favourite" : "Add to Favourite"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
