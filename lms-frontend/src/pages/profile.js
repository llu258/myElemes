import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Profile fetch error:', error.response.data);
        }
      }
    };

    const fetchGrades = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3001/grades', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setGrades(response.data);
        } catch (error) {
          console.error('Grades fetch error:', error.response.data);
        }
      }
    };

    fetchUser();
    fetchGrades();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">

        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === 'student' && (
          <p><strong>Student ID:</strong> {user.studentId}</p>
        )}
        
    </div>
  );
}

export default Profile;