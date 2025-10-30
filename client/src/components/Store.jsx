import Aurora from "./Aurora";
import ChatWidget from "./ChatWidget";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

const EcommerceStore = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const featuredRef = useRef(null);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5070/products?page=${page}&limit=20`,
      );
      const data = await res.json();
      const mapped = data.products.map((item) => {
        const randomIndex = Math.floor(Math.random() * 9) + 1;
        const randomImage = `/temp${randomIndex}.jpg`;

        return {
          id: item._id,
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          image: randomImage,
        };
      });
      setProducts(mapped);
      setTotalPages(Math.ceil(data.total / 20));
      setCurrentPage(page);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

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
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={fetchProducts}
            loading={loading}
          />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
};

export default EcommerceStore;
