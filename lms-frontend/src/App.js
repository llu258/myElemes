// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Grades from './pages/grades';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
    </div>
  );
}

export default App;
