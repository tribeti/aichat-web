import React from "react";

const sports = [
  { name: "Giày chạy bộ", price: "650.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTm1GJZGJlMdA8BPOnYpaHMW_JMBYN5Kgjyw&s" },
  { name: "Vợt cầu lông", price: "300.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ev-ipWT159cpzSeKn7777t-Gm7ekbtm2Kw&s" },
  { name: "Bóng đá", price: "120.000 VND", image: "https://cdn.yousport.vn/Media/Products/231216101512/uhv-2.03-bong-dong-luc-(2).jpg" },
  { name: "Áo thể thao", price: "250.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2aiuuZ8SidrcuIrDaMOz3li8Qz9IG8q3HA&s" },
  { name: "Bình nước thể thao", price: "90.000 VND", image: "https://quatangviva.com/wp-content/uploads/2021/04/binh-nuoc-the-thao-co-quai-500ml-q064-6.jpg" },
  { name: "Găng tay tập gym", price: "110.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HG6xGVm0EgoIb_L3V4nMBhEurX_Cr2nhNQ&s" },
];

export default function Sports() {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav-bar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/beauty">Beauty</a></li>
              <li><a href="/clothing">Clothing</a></li>
              <li><a href="/electronics">Electronics</a></li>
              <li><a href="/homekitchen">Home & Kitchen</a></li>
              <li><a href="/sports">Sports</a></li>
              <li><a href="/deals">Deals</a></li>
            </ul>
          </nav>
        </div>
      </header>
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
    </>
  );
}
