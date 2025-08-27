import React from "react";

const homeKitchen = [
  { name: "Bình giữ nhiệt", price: "180.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/binh-giu-nhiet.jpg" },
  { name: "Nồi cơm điện", price: "650.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/noi-com-dien.jpg" },
  { name: "Máy xay sinh tố", price: "400.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/may-xay.jpg" },
  { name: "Bếp điện từ", price: "1.200.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/bep-dien-tu.jpg" },
  { name: "Nồi áp suất", price: "900.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/noi-ap-suat.jpg" },
  { name: "Máy lọc nước", price: "2.000.000 VND", image: "https://cdn.tgdd.vn/Products/Images/2162/305659/TimerThumb/may-loc-nuoc.jpg" },
];

export default function HomeKitchen() {
  return (
    <div className="page-container">
      <div style={{background:'linear-gradient(135deg,#43cea2 0%,#185a9d 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Đồ gia dụng tiện ích</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Trang bị cho ngôi nhà bạn những sản phẩm chất lượng, giá tốt!</p>
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
  );
}
