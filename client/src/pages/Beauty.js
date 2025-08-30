import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from '../components/ProductCard';

export const beauty = [
  { id: "beauty-6", name: "Kem dưỡng trắng da", brand: "Olay", origin: "Mỹ", price: "250.000 VND", desc: "Kem dưỡng trắng da giúp da sáng mịn, đều màu.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/kem-duong-trang-da-olay-white-radiance-50ml-1.jpg" },
  { id: "beauty-7", name: "Sữa tắm dưỡng ẩm", brand: "Dove", origin: "Việt Nam", price: "70.000 VND", desc: "Sữa tắm dưỡng ẩm giúp da mềm mịn, thơm lâu.", image: "https://cdn.tgdd.vn/Products/Images/8782/233573/sua-tam-dove-1.jpg" },
  { id: "beauty-0", name: "Kem chống nắng", brand: "SunCare", origin: "Việt Nam", price: "120.000 VND", desc: "Kem chống nắng bảo vệ da khỏi tia UV, phù hợp mọi loại da.", image: "https://product.hstatic.net/200000617989/product/anh-01_638f8a72aae5481d882402a0a11951da.png" },
  { id: "beauty-1", name: "Sữa rửa mặt", brand: "Simple", origin: "Anh", price: "90.000 VND", desc: "Sữa rửa mặt dịu nhẹ, làm sạch sâu cho da nhạy cảm.", image: "https://media.hcdn.vn/wysiwyg/kimhuy/combo-simple-tay-trang-200ml-sua-rua-mat-150ml-nuoc-hoa-hong-200ml-2.jpg" },
  { id: "beauty-2", name: "Son môi", brand: "ColorKey", origin: "Trung Quốc", price: "150.000 VND", desc: "Son môi lì, màu sắc tươi tắn, lâu trôi.", image: "https://colorkey.com.vn/cdn/shop/files/8_274230ae-3d5c-4f91-b435-c9175c369aa0.jpg?v=1730460110" },
  { id: "beauty-3", name: "Mặt nạ dưỡng da", brand: "Senka", origin: "Nhật Bản", price: "50.000 VND", desc: "Mặt nạ dưỡng da cấp ẩm, làm sáng da.", image: "https://cf.shopee.vn/file/vn-11134207-7qukw-lfi1jwdsmwzoa8" },
  { id: "beauty-4", name: "Kem dưỡng ẩm", brand: "Aemi", origin: "Việt Nam", price: "200.000 VND", desc: "Kem dưỡng ẩm giúp da mềm mịn, không nhờn rít.", image: "https://assets.aemi.vn/images_resized/2024/10/23/1729656981805-954953" },
  { id: "beauty-5", name: "Tẩy trang", brand: "Bioderma", origin: "Pháp", price: "80.000 VND", desc: "Nước tẩy trang làm sạch da, không gây kích ứng.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDVTpAomiwjUURQJ8OGwR5fFUOFoJWa7qchw&s" },
];

function Beauty({ addToCart }) {
  const [search, setSearch] = useState("");
  const filtered = beauty.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );
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
        <div style={{background:'linear-gradient(135deg,#ff6a00 0%,#ee0979 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Làm đẹp & chăm sóc</h2>
          <p style={{color:'#fff',fontSize:'1.1rem'}}>Sản phẩm làm đẹp chính hãng, an toàn, giá tốt cho mọi nhu cầu!</p>
        </div>
        <div style={{marginBottom:'1rem',textAlign:'center'}}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc',width:'300px'}}
          />
        </div>
        <div className="product-list">
          {filtered.length === 0 ? (
            <div style={{color:'#e91e63',fontWeight:'bold',fontSize:'1.2rem'}}>Không tìm thấy sản phẩm phù hợp.</div>
          ) : (
            filtered.map((item) => (
              <ProductCard key={item.id} {...item} addToCart={addToCart} />
            ))
          )}
        </div>
      </div>
    </>
  );

}

export default Beauty;