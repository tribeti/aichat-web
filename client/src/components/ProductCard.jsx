import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, price, image, onBuy }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (id) navigate(`/detail/${id}`);
  };
  return (
    <div
      className="product-card"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="product-price">{price} USD</p>
      <button
        className="buy-btn"
        onClick={(e) => {
          e.stopPropagation();
          onBuy();
        }}
      >
        Mua ngay
      </button>
    </div>
  );
}

export default ProductCard;
