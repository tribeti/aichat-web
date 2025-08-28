import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-logo">AIChat Store</div>
      <div className="header-links">
        <Link to="/">Trang chủ</Link>
        <Link to="/beauty">Làm đẹp</Link>
        <Link to="/clothing">Thời trang</Link>
        <Link to="/electronics">Điện tử</Link>
        <Link to="/homekitchen">Gia dụng</Link>
        <Link to="/sports">Thể thao</Link>
        <Link to="/deals">Khuyến mãi</Link>
      </div>
    </div>
  );
}
