import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Grades from './pages/grades';
import Admin from './pages/admin'
import Navbar from './components/nav';
import Logout from './pages/logout';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/profile" /> : <Signup />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/grades" element={token ? <Grades /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token ? <Admin /> : <Navigate to="/admin" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
