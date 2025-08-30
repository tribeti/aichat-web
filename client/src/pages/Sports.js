import React from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';

export const sports = [
  { id: "sports-6", name: "Ván trượt thể thao", brand: "Decathlon", origin: "Pháp", price: "500.000 VND", desc: "Ván trượt thể thao chất liệu bền, dễ sử dụng cho người mới.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/van-truot-decathlon.jpg" },
  { id: "sports-7", name: "Bóng rổ", brand: "Spalding", origin: "Mỹ", price: "220.000 VND", desc: "Bóng rổ tiêu chuẩn thi đấu, độ nảy tốt, bền màu.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/bong-ro-spalding.jpg" },
  { id: "sports-0", name: "Giày chạy bộ", brand: "Nike", origin: "Việt Nam", price: "650.000 VND", desc: "Giày chạy bộ nhẹ, êm, phù hợp tập luyện thể thao.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTm1GJZGJlMdA8BPOnYpaHMW_JMBYN5Kgjyw&s" },
  { id: "sports-1", name: "Vợt cầu lông", brand: "Yonex", origin: "Nhật Bản", price: "300.000 VND", desc: "Vợt cầu lông nhẹ, bền, phù hợp mọi trình độ.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ev-ipWT159cpzSeKn7777t-Gm7ekbtm2Kw&s" },
  { id: "sports-2", name: "Bóng đá", brand: "Động Lực", origin: "Việt Nam", price: "120.000 VND", desc: "Bóng đá tiêu chuẩn thi đấu, độ nảy tốt.", image: "https://cdn.yousport.vn/Media/Products/231216101512/uhv-2.03-bong-dong-luc-(2).jpg" },
  { id: "sports-3", name: "Áo thể thao", brand: "Adidas", origin: "Việt Nam", price: "250.000 VND", desc: "Áo thể thao thoáng mát, thấm hút mồ hôi tốt.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2aiuuZ8SidrcuIrDaMOz3li8Qz9IG8q3HA&s" },
  { id: "sports-4", name: "Bình nước thể thao", brand: "Viva", origin: "Việt Nam", price: "90.000 VND", desc: "Bình nước thể thao dung tích 500ml, tiện lợi khi tập luyện.", image: "https://quatangviva.com/wp-content/uploads/2021/04/binh-nuoc-the-thao-co-quai-500ml-q064-6.jpg" },
  { id: "sports-5", name: "Găng tay tập gym", brand: "Aolikes", origin: "Trung Quốc", price: "110.000 VND", desc: "Găng tay tập gym chống trượt, bảo vệ tay khi tập luyện.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HG6xGVm0EgoIb_L3V4nMBhEurX_Cr2nhNQ&s" },
];

export default function Sports({ addToCart }) {
  return (
    <>
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
      <div className="page-container">
        <div style={{background:'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Thể thao & năng động</h2>
          <p style={{color:'#fff',fontSize:'1.1rem'}}>Trang bị dụng cụ thể thao, giày dép, phụ kiện cho mọi hoạt động!</p>
        </div>
        <div className="product-list">
          {sports.map((item) => (
            <ProductCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}
