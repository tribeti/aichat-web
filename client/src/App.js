<<<<<<< HEAD
import Auth from './pages/Auth';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EcommerceStore from './components/Store';
import Electronics from './pages/Electronics';
import Clothing from './pages/Clothing';
import HomeKitchen from './pages/HomeKitchen';
import Beauty from './pages/Beauty';
import Sports from './pages/Sports';
import Deals from './pages/Deals';
import ProductDetail from './components/ProductDetail';
import ProductInfo from './pages/ProductInfo';
import Cart from './components/Cart';
=======
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceStore from "./components/Store";
import Tables from "./pages/Tables";
import Chairs from "./pages/Chairs";
import Beds from "./pages/Beds";
import Lamps from "./pages/Lamps";
import Wardrobes from "./pages/Wardrobes";
import OurStory from "./pages/Story";
import Careers from "./pages/Careers";
>>>>>>> origin/main

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [message, setMessage] = useState("");

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setMessage("Đã thêm vào giỏ hàng!");
    setTimeout(() => setMessage(""), 2000);
    window.location.href = '/cart';
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQty = (id, qty) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const handleCheckout = () => {
    alert('Thanh toán thành công!');
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
<<<<<<< HEAD
      <div style={{display:'flex'}}>
        <div style={{flex:1}}>
          <Routes>
            <Route path="/" element={<EcommerceStore addToCart={addToCart} />} />
            <Route path="/electronics" element={<Electronics addToCart={addToCart} />} />
            <Route path="/clothing" element={<Clothing addToCart={addToCart} />} />
            <Route path="/home-kitchen" element={<HomeKitchen addToCart={addToCart} />} />
            <Route path="/beauty" element={<Beauty addToCart={addToCart} />} />
            <Route path="/sports" element={<Sports addToCart={addToCart} />} />
            <Route path="/deals" element={<Deals addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} message={message} />} />
            <Route path="/product-info" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart cartItems={cart} onRemove={removeFromCart} onCheckout={handleCheckout} onUpdateQty={updateQty} />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
        <div style={{width:'350px',position:'absolute',top:'100px',right:'30px',zIndex:1000,margin:'0 0 0 2rem'}}>
          <Cart cartItems={cart} onRemove={removeFromCart} onCheckout={handleCheckout} onUpdateQty={updateQty} />
        </div>
      </div>
=======
      <Routes>
        <Route path="/" element={<EcommerceStore />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/beds" element={<Beds />} />
        <Route path="/lamps" element={<Lamps />} />
        <Route path="/wardrobes" element={<Wardrobes />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/career" element={<Careers />} />
      </Routes>
>>>>>>> origin/main
    </Router>
  );
}

export default App;
