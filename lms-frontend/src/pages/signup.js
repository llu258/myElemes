import React, { useState } from 'react';
import axios from 'axios';
import "../css/signup.css";
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { name, email, password, role });
      setMessage({ type: 'success', text: 'Signup successful!' });
      console.log('Signup successful:', response.data);
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.error 
                           ? error.response.data.error 
                           : error.message;
      setMessage({ type: 'error', text: errorMessage });
      console.error('Signup error:', errorMessage);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to myElemes</h1>
      <h3>A learning management system</h3>&nbsp;
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p> 
      {message && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Signup;
