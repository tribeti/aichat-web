import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Sofas() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5070/products/category/Sofas?page=${page}&limit=20`);
      const data = await res.json();
      const mapped = data.products.map((item, index) => ({
        id: item.id || `sofa-${page}-${index}`,
        name: item.item_name || "Sản phẩm chưa có tên",
        brand: item.brand || "Không rõ thương hiệu",
        price: item.prices?.sale_price || 0,
        image: "https://placehold.co/400",
      }));
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={fetchProducts}
            loading={loading}
          />
        </div>
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
}
