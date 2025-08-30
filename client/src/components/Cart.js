
import { useEffect, useState } from "react";

function formatPrice(price) {
  if (typeof price === 'string') return price.replace(/[^\d]/g, '');
  return price;
}

export default function Cart({ cartItems, onRemove, onCheckout, onUpdateQty }) {
  const [localCart, setLocalCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLocalCart(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    onRemove(id);
    setMessage("Đã xóa sản phẩm khỏi giỏ hàng!");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    onUpdateQty(id, qty);
  };

  const total = localCart.reduce((sum, item) => {
    const priceNum = parseInt(formatPrice(item.price));
    return sum + priceNum * (item.qty || 1);
  }, 0);

  return (
    <div className="cart-container" style={{padding:'2rem',maxWidth:'600px',margin:'2rem auto',background:'#fff',borderRadius:'12px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{textAlign:'center'}}>🛒 Giỏ hàng của bạn</h2>
      {message && <div style={{background:'#e0ffe0',color:'#185a9d',padding:'0.5rem',borderRadius:'6px',marginBottom:'1rem',textAlign:'center'}}>{message}</div>}
      {localCart.length === 0 ? (
        <p style={{textAlign:'center'}}>Giỏ hàng trống.</p>
      ) : (
        <ul style={{listStyle:'none',padding:0}}>
          {localCart.map((item) => (
            <li key={item.id} style={{display:'flex',alignItems:'center',marginBottom:'1rem',background:'#f7f7f7',borderRadius:'8px',padding:'0.5rem 1rem'}}>
              <img src={item.image} alt={item.name} style={{width:'60px',height:'60px',objectFit:'cover',borderRadius:'8px',marginRight:'1rem'}} />
              <div style={{flex:1}}>
                <b>{item.name}</b>
                <div>{item.price}</div>
                <div>
                  Số lượng: 
                  <input type="number" min={1} value={item.qty || 1} onChange={e => handleQtyChange(item.id, parseInt(e.target.value))} style={{width:'50px',marginLeft:'0.5rem'}} />
                </div>
              </div>
              <button onClick={() => handleRemove(item.id)} style={{marginLeft:'1rem',background:'#ff5252',color:'#fff',border:'none',borderRadius:'6px',padding:'0.5rem 1rem'}}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
      {localCart.length > 0 && (
        <div style={{marginTop:'2rem',textAlign:'right',fontWeight:'bold',fontSize:'1.2rem',color:'#185a9d'}}>Tổng tiền: {total.toLocaleString()} VND</div>
      )}
      {localCart.length > 0 && (
        <button className="checkout-btn" onClick={onCheckout} style={{marginTop:'1rem',width:'100%',background:'#185a9d',color:'#fff',border:'none',borderRadius:'8px',padding:'1rem',fontWeight:'bold',fontSize:'1.1rem'}}>Thanh toán</button>
      )}
    </div>
  );
}
