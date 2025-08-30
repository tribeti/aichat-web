import React from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';

export const clothing = [
  { id: "clothing-6", name: "Áo khoác gió nữ", brand: "Canifa", origin: "Việt Nam", price: "320.000 VND", desc: "Áo khoác gió nữ chống nắng, nhẹ, dễ phối đồ.", image: "https://canifa.com/img/ao-khoac-gio-nu.jpg" },
  { id: "clothing-7", name: "Quần jogger nam", brand: "H&M", origin: "Việt Nam", price: "290.000 VND", desc: "Quần jogger nam co giãn, thoải mái vận động.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/quan-jogger-nam-hm.jpg" },
  { id: "clothing-0", name: "Áo thun nam", brand: "Coolmate", origin: "Việt Nam", price: "220.000 VND", desc: "Áo thun nam chất liệu cotton, thoáng mát, dễ phối đồ.", image: "https://product.hstatic.net/1000369857/product/aht08_renew_0010_layer_2_623e7d3ba67d4cd4937f4e119c9dc9a2.jpg" },
  { id: "clothing-1", name: "Quần jeans nữ", brand: "Levi's", origin: "Việt Nam", price: "350.000 VND", desc: "Quần jeans nữ co giãn, form đẹp, bền màu.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8Xzkm6P3xoteO74DwniLvXBFzsQlGhHTNQ&s" },
  { id: "clothing-2", name: "Áo khoác", brand: "Uniqlo", origin: "Nhật Bản", price: "500.000 VND", desc: "Áo khoác nhẹ, chống nắng, chống gió, thời trang.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZ63_6FclPPNuqc75KdyHbyr-9-LEX9A1rg&s" },
  { id: "clothing-3", name: "Váy hoa nữ", brand: "H&M", origin: "Việt Nam", price: "400.000 VND", desc: "Váy hoa nữ xinh xắn, chất liệu mềm mại, thoáng mát.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SukqZASr22U1ERiDjXRZnXZ_RyG-tkBLiQ&s" },
  { id: "clothing-4", name: "Áo sơ mi nam", brand: "Canifa", origin: "Việt Nam", price: "270.000 VND", desc: "Áo sơ mi nam lịch sự, dễ phối đồ, chất liệu cotton.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYAQAaW-zeTWcfZo1wr76rBtE8HRvnRc8IA&s" },
  { id: "clothing-5", name: "Quần short thể thao", brand: "Adidas", origin: "Việt Nam", price: "180.000 VND", desc: "Quần short thể thao thoáng mát, co giãn tốt.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrUnEoVuMNdR2y2isE9TPmIW5uE0JZjsmKGg&s" },
];

export default function Clothing({ addToCart }) {
  return (
    <>
      <div className="page-container">
        <header className="header">
          <div className="container">
            <nav className="nav-bar">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/beauty">Beauty</Link></li>
                <li><Link to="/clothing">Clothing</Link></li>
                <li><Link to="/electronics">Electronics</Link></li>
                <li><Link to="/home-kitchen">Home & Kitchen</Link></li>
                <li><Link to="/sports">Sports</Link></li>
                <li><Link to="/deals">Deals</Link></li>
              </ul>
            </nav>
          </div>
        </header>
      <div style={{background:'linear-gradient(135deg,#e91e63 0%,#ffb6b9 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Thời trang nổi bật</h2>
        <p style={{color:'#fff',fontSize:'1.1rem'}}>Khám phá các mẫu quần áo mới nhất, phong cách trẻ trung, giá tốt!</p>
      </div>
      <div className="product-list">
        {clothing.map((item) => (
          <ProductCard key={item.id} {...item} addToCart={addToCart} />
        ))}
      </div>
      </div>
    </>
  );
}
