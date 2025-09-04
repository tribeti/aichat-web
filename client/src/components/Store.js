import ChatWidget from "./ChatWidget";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";

const EcommerceStore = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5070/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item) => ({
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          image: "https://placehold.co/400",
        }));
        setResults(mapped);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <Navbar/>
      <main>
        <div className="hero">
          <div className="container">
            <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
              Chào mừng đến ShopSmart!
            </h1>
            <p style={{ fontSize: "1.2rem" }}>
              Mua sắm dễ dàng, hiện đại, giá tốt mỗi ngày.
            </p>
            <button
              style={{
                background: "#e91e63",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                padding: "12px 32px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                marginTop: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              Khám phá ngay
            </button>
          </div>
        </div>
        <div className="container">
          <h2
            style={{ marginTop: "2rem", textAlign: "center", color: "#4a00e0" }}
          >
            Sản phẩm nổi bật
          </h2>
          <div
            className="product-list"
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {results.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: "#e91e63",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Không tìm thấy sản phẩm phù hợp.
              </div>
            ) : (
              results.map((p, idx) => (
                <div className="product-card" key={idx}>
                  <img src={p.image} alt={p.name} className="product-image" />
                  <h3>{p.name}</h3>
                  <p className="product-price">{p.price} USD</p>
                  <button className="buy-btn">Mua ngay</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
};

export default EcommerceStore;
