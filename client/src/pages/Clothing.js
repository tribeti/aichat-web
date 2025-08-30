import React from "react";

const clothing = [
  { name: "Áo thun nam", price: "220.000 VND", image: "https://product.hstatic.net/1000369857/product/aht08_renew_0010_layer_2_623e7d3ba67d4cd4937f4e119c9dc9a2.jpg" },
  { name: "Quần jeans nữ", price: "350.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8Xzkm6P3xoteO74DwniLvXBFzsQlGhHTNQ&s" },
  { name: "Áo khoác", price: "500.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZ63_6FclPPNuqc75KdyHbyr-9-LEX9A1rg&s" },
  { name: "Váy hoa nữ", price: "400.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SukqZASr22U1ERiDjXRZnXZ_RyG-tkBLiQ&s" },
  { name: "Áo sơ mi nam", price: "270.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYAQAaW-zeTWcfZo1wr76rBtE8HRvnRc8IA&s" },
  { name: "Quần short thể thao", price: "180.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrUnEoVuMNdR2y2isE9TPmIW5uE0JZjsmKGg&s" },
];

export default function Clothing() {
  return (
    <>
      <div className="page-container">
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
    </>
  );
}
