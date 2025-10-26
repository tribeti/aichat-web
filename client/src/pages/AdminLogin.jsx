import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginadmin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //  Nếu admin đã đăng nhập rồi → chuyển thẳng sang /admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5070/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin');
      } else {
        setError(data.message || 'Tên đăng nhập hoặc mật khẩu sai');
      }
    } catch (err) {
      console.error(err);
      setError('Không thể kết nối tới máy chủ. Vui lòng thử lại.');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button type="submit">Đăng nhập</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
