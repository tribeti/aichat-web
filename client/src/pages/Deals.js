import React from "react";

const deals = [
  { name: "Smart Watch giảm giá", price: "1.900.000 VND", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Gr8N4FSkgTIC8SLbaScCZXNOnQAAMri9Kw&s" },
  { name: "Áo thun sale", price: "150.000 VND", image: "https://bizweb.dktcdn.net/100/446/974/products/ao-thun-mlb-new-era-heavy-cotton-new-york-yankees-black-13086578-1.jpg?v=1691318321487" },
  { name: "Bình giữ nhiệt khuyến mãi", price: "120.000 VND", image: "https://thudogift.com/wp-content/uploads/2023/03/Binh-giu-nhiet-hien-thi-nhiet-do-mau-do.jpg" },
  { name: "Tai nghe giảm giá", price: "200.000 VND", image: "https://s3v2.interdata.vn:9000/s3-586-15343-storage/dienthoaigiakho/wp-content/uploads/2024/01/27073208/tai-nghe-bluetooth-soundpeats-life-chinh-hang.jpg" },
  { name: "Son môi khuyến mãi", price: "90.000 VND", image: "https://product.hstatic.net/200000019302/product/05_534ee7c7949b438b91a302d0f4017a83.jpg" },
  { name: "Áo khoác giảm giá", price: "300.000 VND", image: "https://product.hstatic.net/1000150581/product/1524d7626-1__1__57804971f6c444c4bd51e1d706286914.jpg" },
];

export default function Deals() {
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
        <div style={{background:'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',borderRadius:'12px',padding:'2rem',marginBottom:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
          <h2 style={{color:'#fff',fontWeight:'bold',fontSize:'2rem'}}>Khuyến mãi HOT</h2>
          <p style={{color:'#fff',fontSize:'1.1rem'}}>Săn ngay các sản phẩm giảm giá, ưu đãi cực lớn hôm nay!</p>
        </div>
        <div className="product-list">
          {deals.map((item, idx) => (
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
