import React from "react";

const sports = [
  { name: "Giày chạy bộ", price: "650.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/giay-chay-bo.jpg" },
  { name: "Vợt cầu lông", price: "300.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/vot-cau-long.jpg" },
  { name: "Bóng đá", price: "120.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/bong-da.jpg" },
  { name: "Áo thể thao", price: "250.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/ao-the-thao.jpg" },
  { name: "Bình nước thể thao", price: "90.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/binh-nuoc.jpg" },
  { name: "Găng tay tập gym", price: "110.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/gang-tay-gym.jpg" },
];

export default function Sports() {
  return (
    <div className="page-container">
      <div style={{background:'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Thể thao & năng động</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Trang bị dụng cụ thể thao, giày dép, phụ kiện cho mọi hoạt động!</p>
      </div>
      <div className="product-list">
        {sports.map((item, idx) => (
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
