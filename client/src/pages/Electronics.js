import React from "react";

const electronics = [
  { name: "Smartphone X", price: "5.000.000 VND", image: "https://cdn.tgdd.vn/Products/Images/42/305659/TimerThumb/iphone-15-pro-max-(2).jpg" },
  { name: "Laptop Pro", price: "15.000.000 VND", image: "https://cdn.tgdd.vn/Products/Images/44/305659/TimerThumb/laptop-pro.jpg" },
  { name: "Tai nghe Bluetooth", price: "350.000 VND", image: "https://cdn.tgdd.vn/Products/Images/54/305659/TimerThumb/tai-nghe-bluetooth.jpg" },
  { name: "Máy tính bảng", price: "7.000.000 VND", image: "https://cdn.tgdd.vn/Products/Images/522/305659/TimerThumb/tablet.jpg" },
  { name: "Camera hành trình", price: "2.500.000 VND", image: "https://cdn.tgdd.vn/Products/Images/4727/305659/TimerThumb/camera-hanh-trinh.jpg" },
  { name: "Loa bluetooth", price: "1.200.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/loa-bluetooth.jpg" },
];

export default function Electronics() {
  return (
    <div className="page-container">
      <div style={{background:'linear-gradient(135deg,#4a00e0 0%,#8e2de2 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Điện tử hiện đại</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Khám phá các sản phẩm công nghệ mới nhất, chính hãng, giá tốt!</p>
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
  );
}
