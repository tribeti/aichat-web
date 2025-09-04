import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";

export default function Chairs() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5070/products/category/Chairs")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item) => ({
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          image: "chair.jpeg",
        }));
        setResults(mapped);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="product-list">
          {results.map((item, idx) => (
            <div className="product-card" key={idx}>
              <img src={item.image} alt={item.name} className="product-image" />
              <h3>{item.name}</h3>
              <p className="product-price">{item.price} USD</p>
              <button className="buy-btn">Mua ngay</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
}
