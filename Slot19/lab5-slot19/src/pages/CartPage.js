import React, { useContext } from "react";
import { Container, Table, Button, Form, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function CartPage() {
  const { items, updateQty, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">🛒 Your Shopping Cart</h2>

      {items.length === 0 ? (
        <Card body className="text-center shadow-sm">
          <p className="mb-2">Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </Card>
      ) : (
        <div className="row">
          {/* Cart Table */}
          <div className="col-lg-8 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Table responsive hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th style={{ width: 110 }}>Price</th>
                      <th style={{ width: 120 }}>Quantity</th>
                      <th style={{ width: 110 }}>Subtotal</th>
                      <th style={{ width: 80 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((i) => (
                      <tr key={i.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={i.image}
                              alt={i.name}
                              width={60}
                              height={60}
                              className="rounded border"
                              style={{ objectFit: "cover" }}
                            />
                            <span className="fw-semibold">{i.name}</span>
                          </div>
                        </td>
                        <td>${Number(i.price).toFixed(2)}</td>
                        <td>
                          <Form.Control
                            type="number"
                            size="sm"
                            min={1}
                            value={i.qty}
                            onChange={(e) => updateQty(i.id, Number(e.target.value))}
                            style={{ maxWidth: 80 }}
                          />
                        </td>
                        <td className="fw-bold">
                          ${(Number(i.price) * i.qty).toFixed(2)}
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(i.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-secondary" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/products")}>
                    Continue Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="fw-bold mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items</span>
                  <span>{items.reduce((sum, i) => sum + i.qty, 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Price</span>
                  <h4 className="text-primary mb-0">${totalValue}</h4>
                </div>
                <Button
                  className="w-100"
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(user ? "/checkout" : "/login")}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}
