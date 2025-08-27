<<<<<<< HEAD
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa'
import ChatWidget from './ChatWidget'

const EcommerceStore = () => {
=======
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ChatWidget from './ChatWidget';

const featuredProducts = [
  { name: 'Tai nghe Bluetooth', price: '350,000', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0D4u5AzTgXfSH54hH1STIth8untaSHU4mw&s" },
  { name: 'Áo thun nam', price: '220,000', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGdDBV25LQYGNJ4g4ViT1UxczWU8NRkto6nw&s" },
  { name: 'Bình giữ nhiệt', price: '180,000', image: 'https://via.placeholder.com/150?text=Binh+giu+nhiet' },
  { name: 'Kem chống nắng', price: '120,000', image: 'https://via.placeholder.com/150?text=Kem+chong+nang' },
];

const EcommerceStore = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(featuredProducts);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setResults(featuredProducts);
      return;
    }
    setResults(
      featuredProducts.filter(p => p.name.toLowerCase().includes(keyword))
    );
  };

>>>>>>> master
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="top-bar">
            <div className="logo">ShopSmart</div>
<<<<<<< HEAD
            <div className="search-bar">
              <input type="text" placeholder="Search for products..." />
              <button>
                <FaSearch />
              </button>
            </div>

=======
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm sản phẩm nổi bật..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
>>>>>>> master
            <div className="nav-icons">
              <a href="#account">
                <FaUser size={20} />
              </a>
              <a href="#wishlist">
                <FaHeart size={20} />
                <span className="badge">{3}</span>
              </a>
              <a href="#cart">
                <FaShoppingCart size={20} />
                <span className="badge">{2}</span>
              </a>
            </div>
          </div>
<<<<<<< HEAD

          <nav className="nav-bar">
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Home & Kitchen</a></li>
              <li><a href="#">Beauty</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Deals</a></li>
=======
          <nav className="nav-bar">
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/electronics">Electronics</Link></li>
              <li><Link to="/clothing">Clothing</Link></li>
              <li><Link to="/home-kitchen">Home & Kitchen</Link></li>
              <li><Link to="/beauty">Beauty</Link></li>
              <li><Link to="/sports">Sports</Link></li>
              <li><Link to="/deals">Deals</Link></li>
>>>>>>> master
            </ul>
          </nav>
        </div>
      </header>
<<<<<<< HEAD

      <main>
        <div className="hero">
          <div className="container">
            <h1>Summer Sale is Live!</h1>
            <p>Get up to 50% off on selected items. Limited time offer.</p>
            <button>Shop Now</button>
          </div>
        </div>
      </main>

=======
      <main>
        <div className="hero">
          <div className="container">
            <h1 style={{fontWeight:'bold',fontSize:'2.5rem'}}>Chào mừng đến ShopSmart!</h1>
            <p style={{fontSize:'1.2rem'}}>Mua sắm dễ dàng, hiện đại, giá tốt mỗi ngày.</p>
            <button style={{background:'#e91e63',color:'#fff',border:'none',borderRadius:'30px',padding:'12px 32px',fontSize:'1.1rem',fontWeight:'bold',marginTop:'1rem',boxShadow:'0 2px 8px rgba(0,0,0,0.12)'}}>Khám phá ngay</button>
            <div style={{marginTop:'2rem',background:'#fff',borderRadius:'12px',padding:'1.5rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',maxWidth:'600px',marginLeft:'auto',marginRight:'auto'}}>
              <h3 style={{color:'#4a00e0'}}>Hướng dẫn sử dụng:</h3>
              <ul style={{fontSize:'1rem',color:'#333',marginTop:'1rem',lineHeight:'2'}}>
                <li>Chọn danh mục ở menu trên để xem sản phẩm.</li>
                <li>Nhấn vào <b>Mua ngay</b> để đặt hàng nhanh.</li>
                <li>Dùng khung chat để hỏi đáp hoặc hỗ trợ.</li>
                <li>Dùng ô tìm kiếm để lọc sản phẩm nổi bật.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 style={{marginTop: '2rem',textAlign:'center',color:'#4a00e0'}}>Sản phẩm nổi bật</h2>
          <div className="product-list" style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center'}}>
            {results.length === 0 ? (
              <div style={{textAlign:'center',width:'100%',color:'#e91e63',fontWeight:'bold',fontSize:'1.2rem'}}>Không tìm thấy sản phẩm phù hợp.</div>
            ) : (
              results.map((p, idx) => (
                <div className="product-card" key={idx}>
                  <img src={p.image} alt={p.name} className="product-image" />
                  <h3>{p.name}</h3>
                  <p className="product-price">{p.price} VND</p>
                  <button className="buy-btn">Mua ngay</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
>>>>>>> master
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>Shop</h3>
              <ul>
                <li><a href="#">Electronics</a></li>
                <li><a href="#">Clothing</a></li>
                <li><a href="#">Home & Kitchen</a></li>
                <li><a href="#">Beauty</a></li>
                <li><a href="#">Sports</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
                <li><a href="#">Order Tracking</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>About Us</h3>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Connect With Us</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Pinterest</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="copyright">
            &copy {new Date().getFullYear()} ShopSmart. All rights reserved.
          </div>
        </div>
      </footer>
      <ChatWidget />
    </>
<<<<<<< HEAD
  )
}

export default EcommerceStore
=======
  );
}

export default EcommerceStore;
>>>>>>> master
