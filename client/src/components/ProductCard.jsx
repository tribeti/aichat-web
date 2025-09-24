import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProductCard({ id, name, price, image, onBuy }) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product/${id}`);
  };

  const handleBuyClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <img
        src={image}
        alt={name}
        className="product-image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      <h3>{name}</h3>
      <p className="product-price">{price} VND</p>
      <button className="buy-btn" onClick={handleBuyClick}>Mua ngay</button>
    </div>
  );
}

export default ProductCard;
