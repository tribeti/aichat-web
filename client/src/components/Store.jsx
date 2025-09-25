import ChatWidget from "./ChatWidget";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

const EcommerceStore = () => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const featuredRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5070/products")
      .then((res) => res.json())
      .then((data) => {
        const limited = data.slice(0, 20);
        const mapped = limited.map((item) => ({
          id: item._id,
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          image: "https://placehold.co/400",
        }));
        setResults(mapped);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return results;
    return results.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [results, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Tạo thông báo tạm thời
    const notification = document.createElement("div");
    notification.className = "add-to-cart-success";
    notification.innerHTML = `Đã thêm ${product.name} vào giỏ hàng!`;
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
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
              onClick={() => {
                const element = featuredRef.current;
                if (element) {
                  const y =
                    element.getBoundingClientRect().top +
                    window.pageYOffset -
                    100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
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
        <div ref={featuredRef} className="container">
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
            {filteredResults.length === 0 ? (
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
              filteredResults.map((p, idx) => (
                <ProductCard
                  key={idx}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  onBuy={() => handleAddToCart(p)}
                />
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
