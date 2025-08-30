import React from "react";
import { useParams } from "react-router-dom";

// Import all product arrays from category pages
import { beauty } from '../pages/Beauty';
import { clothing } from '../pages/Clothing';
import { electronics } from '../pages/Electronics';
import { deals } from '../pages/Deals';
import { sports } from '../pages/Sports';
import { homeKitchen } from '../pages/HomeKitchen';

const allProducts = [
  ...beauty,
  ...clothing,
  ...electronics,
  ...deals,
  ...sports,
  ...homeKitchen
];

export default function ProductDetail({ addToCart, message }) {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === id);

  if (!product) return <div>Không tìm thấy sản phẩm!</div>;

  return (
    <div className="product-detail" style={{padding:'2rem',maxWidth:'600px',margin:'2rem auto',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      {message && <div style={{background:'#e0ffe0',color:'#185a9d',padding:'0.5rem',borderRadius:'6px',marginBottom:'1rem',textAlign:'center'}}>{message}</div>}
      <img src={product.image} alt={product.name} style={{width:'100%',borderRadius:'8px'}} />
      <h2>{product.name}</h2>
      <p style={{fontWeight:'bold',color:'#185a9d'}}>{product.price}</p>
      <p><b>Thương hiệu:</b> {product.brand}</p>
      <p><b>Xuất xứ:</b> {product.origin}</p>
      <p>{product.desc}</p>
      <button className="buy-btn" onClick={() => addToCart(product)} style={{marginRight:'1rem'}}>Thêm vào giỏ hàng</button>
      <button className="buy-btn">Mua ngay</button>
    </div>
  );
}
