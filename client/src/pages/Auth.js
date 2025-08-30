import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.username || !form.password) return "Vui lòng nhập đầy đủ thông tin!";
    if (form.username.length < 4) return "Tên đăng nhập phải từ 4 ký tự trở lên!";
    if (form.password.length < 6) return "Mật khẩu phải từ 6 ký tự trở lên!";
    if (!isLogin && form.password !== form.confirm) return "Mật khẩu xác nhận không khớp!";
    return "";
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (isLogin) {
      // Kiểm tra user đã đăng ký
      const regUser = localStorage.getItem('regUser');
      if (!regUser) {
        setError("Tài khoản chưa đăng ký!");
        return;
      }
      const userObj = JSON.parse(regUser);
      if (userObj.username !== form.username || userObj.password !== form.password) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng!");
        return;
      }
      localStorage.setItem("user", JSON.stringify({ username: form.username }));
      navigate("/");
    } else {
      // Đăng ký: lưu thông tin vào localStorage
      localStorage.setItem("regUser", JSON.stringify({ username: form.username, password: form.password }));
      localStorage.setItem("user", JSON.stringify({ username: form.username }));
      navigate("/");
    }
  };

  return (
    <div style={{maxWidth:400,margin:'4rem auto',background:'#fff',borderRadius:12,padding:'2rem',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{textAlign:'center',marginBottom:'1rem'}}>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'1rem'}}>
          <label>Tên đăng nhập</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc'}} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label>Mật khẩu</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc'}} />
        </div>
        {!isLogin && (
          <div style={{marginBottom:'1rem'}}>
            <label>Xác nhận mật khẩu</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} style={{width:'100%',padding:'0.5rem',borderRadius:'6px',border:'1px solid #ccc'}} />
          </div>
        )}
        {error && <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>}
        <button type="submit" style={{width:'100%',background:'#185a9d',color:'#fff',border:'none',borderRadius:'8px',padding:'1rem',fontWeight:'bold',fontSize:'1.1rem'}}>{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
      </form>
      <div style={{marginTop:'1rem',textAlign:'center'}}>
        <button onClick={()=>setIsLogin(!isLogin)} style={{background:'none',border:'none',color:'#185a9d',textDecoration:'underline',cursor:'pointer'}}>
          {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
        </button>
      </div>
    </div>
  );
}
