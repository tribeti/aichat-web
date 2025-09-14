import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Sofas() {
  const [results, setResults] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5070/products/category/Sofas")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item, index) => ({
          id: item.id || `sofa-${index}`,
          name: item.item_name || "Sản phẩm chưa có tên",
          brand: item.brand || "Không rõ thương hiệu",
          price: item.prices?.sale_price || 0,
          image: "https://placehold.co/400",
        }));
        setResults(mapped);
      })
      .catch((err) => console.error("Fetch error:", err));
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
          {results.map((item, idx) => (
            <ProductCard
              key={idx}
              name={item.name}
              price={item.price}
              image={item.image}
              onBuy={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
}
