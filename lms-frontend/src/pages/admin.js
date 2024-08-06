import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userResponse = await axios.get('http://localhost:3001/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(userResponse.data);

        const logResponse = await axios.get('http://localhost:3001/admin/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(logResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('http://localhost:3001/admin', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        setForm({ name: '', email: '', password: '', role: '' });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token && selectedUser) {
      try {
        await axios.put(`http://localhost:3001/admin/${selectedUser.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
        setSelectedUser(null);
        setForm({ name: '', email: '', password: '', role: '' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.delete(`http://localhost:3001/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={selectedUser ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select className="form-control" name="role" value={form.role} onChange={handleInputChange} required>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Logs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.message}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
