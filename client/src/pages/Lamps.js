import React from "react";
import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const homeKitchen = [
  {
    name: "Bình giữ nhiệt",
    price: "180.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3PbYhRe33An8pdotq2Wqm5GXJJ7fD78djg&s",
  },
  {
    name: "Nồi cơm điện",
    price: "650.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3MwT9W_uImorE0kVOyPji_BaQw2haeIhVA&s",
  },
  {
    name: "Máy xay sinh tố",
    price: "400.000 VND",
    image: "https://i-giadinh.vnecdn.net/2020/05/11/22-6440-1589161716.jpg",
  },
  {
    name: "Bếp điện từ",
    price: "1.200.000 VND",
    image:
      "https://product.hstatic.net/200000574527/product/bep-dien-tu-am-sanko-si-258-i-2-dien-tu_76699a2a7701425db216694b09e82f40.jpg",
  },
  {
    name: "Nồi áp suất",
    price: "900.000 VND",
    image:
      "https://giadungnhap.com/wp-content/uploads/2024/05/20220324_55ZzrOB064a4SZsnGmkvQwrh.jpg",
  },
  {
    name: "Máy lọc nước",
    price: "2.000.000 VND",
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/402/666/products/karofi-kad-d50.png?v=1687150669537",
  },
];

export default function Lamps() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <div
          style={{
            background: "linear-gradient(135deg,#43cea2 0%,#185a9d 100%)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#fff", fontWeight: "bold", fontSize: "2rem" }}>
            Đồ gia dụng tiện ích
          </h2>
          <p style={{ color: "#fff", fontSize: "1.1rem" }}>
            Trang bị cho ngôi nhà bạn những sản phẩm chất lượng, giá tốt!
          </p>
        </div>
        <div className="product-list">
          {homeKitchen.map((item, idx) => (
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
