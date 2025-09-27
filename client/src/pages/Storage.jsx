import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Storage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5070/products/category/Storage?page=${page}&limit=20`);
      const data = await res.json();
      const mapped = data.products.map((item, index) => ({
        id: item.id || `storage-${page}-${index}`,
        name: item.item_name || "Sản phẩm chưa có tên",
        brand: item.brand || "Không rõ thương hiệu",
        price: item.prices?.sale_price || 0,
        image: "https://placehold.co/400",
      }));
      if (page === 1) {
        setProducts(mapped);
      } else {
        setProducts(prev => [...prev, ...mapped]);
      }
      setHasMore(products.length + mapped.length < data.total);
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

  const handleAddToCart = (product) => {
    addToCart(product);
    // Tạo thông báo tạm thời
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-success';
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
      <Navbar />
      <div className="page-container">
        <div className="product-list">
          {products.map((item, idx) => (
            <ProductCard
              key={idx}
              name={item.name}
              price={item.price}
              image={item.image}
              onBuy={() => handleAddToCart(item)}
            />
          ))}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={() => fetchProducts(currentPage + 1)}
                disabled={loading}
                style={{
                  background: "#4a00e0",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  padding: "12px 32px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Đang tải..." : "Tải thêm sản phẩm"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
}
