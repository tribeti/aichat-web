import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <h2>Đăng ký</h2>
      <form>
        <input type="text" placeholder="Tên đăng nhập" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </div>
  );
}

export default Register;
