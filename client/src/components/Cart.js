import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Giỏ hàng của bạn đang trống.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Giá: {item.price} VND</p>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        Tổng cộng: {getTotalPrice()} VND
      </div>
      <Link to="/checkout" className="checkout-link">
        <button className="checkout-button">Thanh toán</button>
      </Link>
    </div>
  );
};

export default Cart;
