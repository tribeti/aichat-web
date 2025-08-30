import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, price, image, addToCart }) {
  const navigate = useNavigate();
  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (addToCart) {
      addToCart({ id, name, price, image });
    }
    navigate(`/product/${id}`);
  };
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} style={{textDecoration:'none',color:'inherit'}}>
        <img src={image} alt={name} className="product-image" />
        <h3>{name}</h3>
      </Link>
      <p className="product-price">{price} VND</p>
      <button className="buy-btn" onClick={handleBuyNow}>Mua ngay</button>
    </div>
  );
}

export default ProductCard;
