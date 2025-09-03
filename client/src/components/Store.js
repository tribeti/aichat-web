import ChatWidget from "./ChatWidget";
import Navbar from "./Navbar";
import React, { useState } from "react";
import Footer from "./Footer";

const featuredProducts = [
  {
    name: "Tai nghe Bluetooth",
    price: "350,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0D4u5AzTgXfSH54hH1STIth8untaSHU4mw&s",
  },
  {
    name: "Áo thun nam",
    price: "220,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGdDBV25LQYGNJ4g4ViT1UxczWU8NRkto6nw&s",
  },
  {
    name: "Bình giữ nhiệt",
    price: "180,000",
    image:
      "https://product.hstatic.net/200000661969/product/binh_giu_nhiet_thermos_24h_1_2l_mau_bac__2__c815b80262854228bcbac40f352d612f_1024x1024.png",
  },
  {
    name: "Kem chống nắng",
    price: "120,000",
    image:
      "https://product.hstatic.net/1000296801/product/kem-chong-nang-innisfree-long-lasting-mau-moi_06657d93b2294f38befa1d9251f0a07a_master.png",
  },
];

const EcommerceStore = () => {

  const [results, setResults] = useState(featuredProducts);
  return (
    <>
      <Navbar featuredProducts={featuredProducts}
        results={results}
        setResults={setResults} />
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
                  <p className="product-price">{p.price} VND</p>
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
