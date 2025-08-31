import React from "react";
import ChatWidget from "../components/ChatWidget";

const electronics = [
  {
    name: "Smartphone X",
    price: "5.000.000 VND",
    image:
      "https://dienthoaixachtay.com.vn/public/upload/images/hinhsanpham/samsung-note-20-ultra-chinh-hang-99-85191617426304.jpg",
  },
  {
    name: "Laptop Pro",
    price: "15.000.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRflPEoQkcYb0lK23y0aETcppT6RpTkm7wDeQ&s",
  },
  {
    name: "Tai nghe Bluetooth",
    price: "350.000 VND",
    image:
      "https://bizweb.dktcdn.net/100/479/913/products/tai-nghe-sony-wh-ch720n-5.jpg?v=1690526599063",
  },
  {
    name: "Máy tính bảng",
    price: "7.000.000 VND",
    image: "https://cdn.tgdd.vn//News/1500952//may-tinh-bang-13-800x450.jpg",
  },
  {
    name: "Camera hành trình",
    price: "2.500.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK59JzIzfgf7071Hbf75efZGF59UE2k0QMhA&s",
  },
  {
    name: "Loa bluetooth",
    price: "1.200.000 VND",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxc71Qpx_QlpH8HDUL7y2xZqF3ngzbcWMQzA&s",
  },
];

export default function Tables() {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav-bar">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/beauty">Beauty</a>
              </li>
              <li>
                <a href="/chairs">Chairs</a>
              </li>
              <li>
                <a href="/electronics">Electronics</a>
              </li>
              <li>
                <a href="/homekitchen">Home & Kitchen</a>
              </li>
              <li>
                <a href="/sports">Sports</a>
              </li>
              <li>
                <a href="/deals">Deals</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="page-container">
        <div
          style={{
            background: "linear-gradient(135deg,#4a00e0 0%,#8e2de2 100%)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "#fff", fontWeight: "bold", fontSize: "2rem" }}>
            Điện tử hiện đại
          </h2>
          <p style={{ color: "#fff", fontSize: "1.1rem" }}>
            Khám phá các sản phẩm công nghệ mới nhất, chính hãng, giá tốt!
          </p>
        </div>
        <div className="product-list">
          {electronics.map((item, idx) => (
            <div className="product-card" key={idx}>
              <img src={item.image} alt={item.name} className="product-image" />
              <h3>{item.name}</h3>
              <p className="product-price">{item.price}</p>
              <button className="buy-btn">Mua ngay</button>
            </div>
          ))}
        </div>
      </div>
      <ChatWidget />
    </>
  );
}
