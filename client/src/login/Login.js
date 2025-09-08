import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form>
        <input type="text" placeholder="Tên đăng nhập" required />
        <input type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </div>
  );
}

export default Login;
