import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Menu() {
  return (
    <nav className="main-menu" style={{background:'#185a9d',padding:'1rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',color:'#fff',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <div style={{fontWeight:'bold',fontSize:'1.5rem'}}>AIChat Store</div>
      <div style={{display:'flex',gap:'2rem'}}>
        <Link to="/" style={{color:'#fff',textDecoration:'none'}}>Home</Link>
        <Link to="/beauty" style={{color:'#fff',textDecoration:'none'}}>Beauty</Link>
        <Link to="/clothing" style={{color:'#fff',textDecoration:'none'}}>Clothing</Link>
        <Link to="/electronics" style={{color:'#fff',textDecoration:'none'}}>Electronics</Link>
        <Link to="/homekitchen" style={{color:'#fff',textDecoration:'none'}}>Home & Kitchen</Link>
        <Link to="/sports" style={{color:'#fff',textDecoration:'none'}}>Sports</Link>
        <Link to="/deals" style={{color:'#fff',textDecoration:'none'}}>Deals</Link>
      </div>
    </nav>
  );
}
