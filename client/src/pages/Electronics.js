import React from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';

export const electronics = [
  { id: "electronics-6", name: "Máy ảnh kỹ thuật số", brand: "Canon", origin: "Nhật Bản", price: "8.000.000 VND", desc: "Máy ảnh kỹ thuật số chụp ảnh sắc nét, zoom quang học.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/may-anh-canon.jpg" },
  { id: "electronics-7", name: "Tivi LED 43 inch", brand: "Sony", origin: "Nhật Bản", price: "7.500.000 VND", desc: "Tivi LED 43 inch hình ảnh sắc nét, âm thanh sống động.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/tivi-sony-43-inch.jpg" },
  { id: "electronics-0", name: "Smartphone X", brand: "SamTech", origin: "Hàn Quốc", price: "5.000.000 VND", desc: "Điện thoại thông minh màn hình lớn, pin lâu, camera sắc nét.", image: "https://dienthoaixachtay.com.vn/public/upload/images/hinhsanpham/samsung-note-20-ultra-chinh-hang-99-85191617426304.jpg" },
  { id: "electronics-1", name: "Laptop Pro", brand: "Dell", origin: "Mỹ", price: "15.000.000 VND", desc: "Laptop cấu hình mạnh, màn hình sắc nét, pin lâu.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRflPEoQkcYb0lK23y0aETcppT6RpTkm7wDeQ&s" },
  { id: "electronics-2", name: "Tai nghe Bluetooth", brand: "Sony", origin: "Nhật Bản", price: "350.000 VND", desc: "Tai nghe Bluetooth chống ồn, âm thanh chất lượng cao.", image: "https://bizweb.dktcdn.net/100/479/913/products/tai-nghe-sony-wh-ch720n-5.jpg?v=1690526599063" },
  { id: "electronics-3", name: "Máy tính bảng", brand: "Samsung", origin: "Hàn Quốc", price: "7.000.000 VND", desc: "Máy tính bảng màn hình lớn, pin lâu, hỗ trợ bút S-Pen.", image: "https://cdn.tgdd.vn//News/1500952//may-tinh-bang-13-800x450.jpg" },
  { id: "electronics-4", name: "Camera hành trình", brand: "Xiaomi", origin: "Trung Quốc", price: "2.500.000 VND", desc: "Camera hành trình ghi hình Full HD, hỗ trợ thẻ nhớ.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK59JzIzfgf7071Hbf75efZGF59UE2k0QMhA&s" },
  { id: "electronics-5", name: "Loa bluetooth", brand: "JBL", origin: "Mỹ", price: "1.200.000 VND", desc: "Loa bluetooth chống nước, âm thanh sống động.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxc71Qpx_QlpH8HDUL7y2xZqF3ngzbcWMQzA&s" },
];

export default function Electronics({ addToCart }) {
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
        <div style={{background:'linear-gradient(135deg,#4a00e0 0%,#8e2de2 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Điện tử hiện đại</h2>
          <p style={{color:'#fff',fontSize:'1.1rem'}}>Khám phá các sản phẩm công nghệ mới nhất, chính hãng, giá tốt!</p>
        </div>
        <div className="product-list">
          {electronics.map((item) => (
            <ProductCard key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
}
