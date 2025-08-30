import React from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';

export const deals = [
  { id: "deals-6", name: "Máy sấy tóc giảm giá", brand: "Philips", origin: "Hà Lan", price: "250.000 VND", desc: "Máy sấy tóc công suất lớn, sấy nhanh, bảo vệ tóc.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/may-say-toc-philips.jpg" },
  { id: "deals-7", name: "Balo thời trang sale", brand: "Adidas", origin: "Việt Nam", price: "350.000 VND", desc: "Balo thời trang chống nước, nhiều ngăn tiện lợi.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/balo-adidas.jpg" },
  { id: "deals-0", name: "Smart Watch giảm giá", brand: "TechFit", origin: "Trung Quốc", price: "1.900.000 VND", desc: "Đồng hồ thông minh đo nhịp tim, kết nối Bluetooth.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Gr8N4FSkgTIC8SLbaScCZXNOnQAAMri9Kw&s" },
  { id: "deals-1", name: "Áo thun sale", brand: "MLB", origin: "Việt Nam", price: "150.000 VND", desc: "Áo thun cotton, thiết kế trẻ trung, giá ưu đãi.", image: "https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-new-era-heavy-cotton-new-york-yankees-black-13086578-1.jpg?v=1691318321487" },
  { id: "deals-2", name: "Bình giữ nhiệt khuyến mãi", brand: "Lock&Lock", origin: "Hàn Quốc", price: "120.000 VND", desc: "Bình giữ nhiệt dung tích 500ml, giữ nóng/lạnh lâu.", image: "https://thudogift.com/wp-content/uploads/2023/03/Binh-giu-nhiet-hien-thi-nhiet-do-mau-do.jpg" },
  { id: "deals-3", name: "Tai nghe giảm giá", brand: "SoundPEATS", origin: "Trung Quốc", price: "200.000 VND", desc: "Tai nghe Bluetooth chống ồn, âm thanh chất lượng cao.", image: "https://s3v2.interdata.vn:9000/s3-586-15343-storage/dienthoaigiakho/wp-content/uploads/2024/01/27073208/tai-nghe-bluetooth-soundpeats-life-chinh-hang.jpg" },
  { id: "deals-4", name: "Son môi khuyến mãi", brand: "ColorKey", origin: "Trung Quốc", price: "90.000 VND", desc: "Son môi lì, màu sắc tươi tắn, lâu trôi.", image: "https://product.hstatic.net/200000019302/product/05_534ee7c7949b438b91a302d0f4017a83.jpg" },
  { id: "deals-5", name: "Áo khoác giảm giá", brand: "Canifa", origin: "Việt Nam", price: "300.000 VND", desc: "Áo khoác nhẹ, chống nắng, chống gió, thời trang.", image: "https://product.hstatic.net/1000150581/product/1524d7626-1__1__57804971f6c444c4bd51e1d706286914.jpg" },
];

export default function Deals({ addToCart }) {
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
        <div style={{background:'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Khuyến mãi HOT</h2>
          <p style={{color:'#fff',fontSize:'1.1rem'}}>Săn ngay các sản phẩm giảm giá, ưu đãi cực lớn hôm nay!</p>
        </div>
        <div className="product-list">
          {deals.map((item) => (
            <ProductCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}
