import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/grades.css';

function Grades() {
  const [grades, setGrades] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [user, setUser] = useState(null);

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

    fetchUser();
  }, []);

  const fetchGrades = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3001/grades?studentId=${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Grades fetch error:', error.response.data);
      }
    }
  };

  const handleSubmitGrade = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:3001/grades', { studentId, subject, grade }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGrades([...grades, response.data]);
        setGrade('');
        setStudentId('');
        setSubject('');
      } catch (error) {
        console.error('Grade submission error:', error.response.data);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Grades</h2>
      {user.role === 'teacher' && (
        <form onSubmit={handleSubmitGrade}>
          <div className="form-group">
            <label>Student ID</label>
            <input type="text" className="form-control" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Grade</label>
            <input type="number" className="form-control" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit Grade</button>
        </form>
      )}
      {user.role === 'student' && (
        <div>
          <form onSubmit={(e) => { e.preventDefault(); fetchGrades(); }}>
            <div className="form-group">
              <label>Enter Student ID to View Grades</label>
              <input type="text" className="form-control" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Fetch Grades</button>
          </form>
          <h3>Your Grades</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id}>
                  <td>{g.subject}</td>
                  <td>{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Grades;