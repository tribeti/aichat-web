import React from "react";
import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const beauty = [
  {
    name: "Kem chống nắng",
    price: "120.000 VND",
    image:
      "https://product.hstatic.net/200000617989/product/anh-01_638f8a72aae5481d882402a0a11951da.png",
  },
  {
    name: "Sữa rửa mặt",
    price: "90.000 VND",
    image:
      "https://media.hcdn.vn/wysiwyg/kimhuy/combo-simple-tay-trang-200ml-sua-rua-mat-150ml-nuoc-hoa-hong-200ml-2.jpg",
  },
  {
    name: "Son môi",
    price: "150.000 VND",
    image:
      "https://colorkey.com.vn/cdn/shop/files/8_274230ae-3d5c-4f91-b435-c9175c369aa0.jpg?v=1730460110",
  },
  {
    name: "Mặt nạ dưỡng da",
    price: "50.000 VND",
    image: "https://cf.shopee.vn/file/vn-11134207-7qukw-lfi1jwdsmwzoa8",
  },
  {
    name: "Kem dưỡng ẩm",
    price: "200.000 VND",
    image:
      "https://assets.aemi.vn/images_resized/2024/10/23/1729656981805-954953",
  },
  {
    name: "Tẩy trang",
    price: "80.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDVTpAomiwjUURQJ8OGwR5fFUOFoJWa7qchw&s",
  },
];

export default function Chairs() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div
          style={{
            background: "linear-gradient(135deg,#ff6a00 0%,#ee0979 100%)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#fff", fontWeight: "bold", fontSize: "2rem" }}>
            Làm đẹp & chăm sóc
          </h2>
          <p style={{ color: "#fff", fontSize: "1.1rem" }}>
            Sản phẩm làm đẹp chính hãng, an toàn, giá tốt cho mọi nhu cầu!
          </p>
        </div>
        <div className="product-list">
          {beauty.map((item, idx) => (
            <div className="product-card" key={idx}>
              <img src={item.image} alt={item.name} className="product-image" />
              <h3>{item.name}</h3>
              <p className="product-price">{item.price}</p>
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
