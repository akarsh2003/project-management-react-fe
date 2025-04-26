import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }

      // Optionally save user info
      localStorage.setItem('user', JSON.stringify(res.data));

    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
