// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      console.log('Login successful:', response.data);
      // Save the token or handle successful login
      localStorage.setItem('token', response.data.token);
      window.location.href = '/profile';    // Redirect to profile page
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect email or password');  // Set error message for incorrect login
      } else if (error.response && error.response.data && typeof error.response.data === 'object') {
        setErrorMessage(error.response.data.error);  // Set detailed error message
      } else {
        setErrorMessage('Login error: ' + (error.response ? error.response.data : error.message));
      }
    }
  };

  return (
    <div className="container">
      <h1>Welcome to myElemes</h1>
      <h3>A primitive learning management system</h3>&nbsp;
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
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
}

export default Login;
