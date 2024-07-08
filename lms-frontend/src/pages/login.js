// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      console.log('Login successful:', response.data);
      // Save the token or handle successful login
      localStorage.setItem('token', response.data.token);
      window.location.href = '/profile';    // Redirect to profile page
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
