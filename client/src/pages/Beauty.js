import React from "react";

const beauty = [
  { name: "Kem chống nắng", price: "120.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/kem-chong-nang.jpg" },
  { name: "Sữa rửa mặt", price: "90.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/sua-rua-mat.jpg" },
  { name: "Son môi", price: "150.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/son-moi.jpg" },
  { name: "Mặt nạ dưỡng da", price: "50.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/mat-na.jpg" },
  { name: "Kem dưỡng ẩm", price: "200.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/kem-duong-am.jpg" },
  { name: "Tẩy trang", price: "80.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/tay-trang.jpg" },
];

export default function Beauty() {
  return (
    <div className="page-container">
      <div style={{background:'linear-gradient(135deg,#ff6a00 0%,#ee0979 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Làm đẹp & chăm sóc</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Sản phẩm làm đẹp chính hãng, an toàn, giá tốt cho mọi nhu cầu!</p>
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
  );
}
