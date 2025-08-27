import React from "react";

const clothing = [
  { name: "Áo thun nam", price: "220.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/ao-thun-nam-1.jpg" },
  { name: "Quần jeans nữ", price: "350.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/quan-jeans-nu-1.jpg" },
  { name: "Áo khoác", price: "500.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/ao-khoac-nam-1.jpg" },
  { name: "Váy hoa nữ", price: "400.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/vay-hoa-nu-1.jpg" },
  { name: "Áo sơ mi nam", price: "270.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/ao-so-mi-nam-1.jpg" },
  { name: "Quần short thể thao", price: "180.000 VND", image: "https://cdn.tgdd.vn/Products/Images/7464/303554/quan-short-nam-1.jpg" },
];

export default function Clothing() {
  return (
    <div className="page-container">
      <div style={{background:'linear-gradient(135deg,#e91e63 0%,#ffb6b9 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Thời trang nổi bật</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Khám phá các mẫu quần áo mới nhất, phong cách trẻ trung, giá tốt!</p>
      </div>
      <div className="product-list">
        {clothing.map((item, idx) => (
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
