import React from "react";
import "../App.css";

function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="product-price">{price} VND</p>
      <button className="buy-btn">Mua ngay</button>
    </div>
  );
}

export default ProductCard;
