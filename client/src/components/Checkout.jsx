import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Giỏ hàng trống</h2>
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <a href="/" className="back-to-shop">Quay về cửa hàng</a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Thanh toán</h1>
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Họ tên:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phương thức thanh toán:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="credit_card">Thẻ tín dụng</option>
                <option value="debit_card">Thẻ ghi nợ</option>
                <option value="paypal">PayPal</option>
                <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
              </select>
            </div>
            <button type="submit" className="checkout-button">
              Thanh toán {getTotalPrice()} USD
            </button>
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <ul className="checkout-items">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <h3>{item.name}</h3>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {item.price * item.quantity} USD</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <strong>Tổng cộng: {getTotalPrice()} USD</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
