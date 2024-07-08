import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/grades.css';

function Grades() {
  const [grades, setGrades] = useState([]);
  const [grade, setGrade] = useState('');
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState(''); 

  useEffect(() => {
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
    fetchGrades();
  }, []);

  const handleSubmit = async (e) => {
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

  return (
    <div className="container">
      <h2>Grades</h2>
      <form onSubmit={handleSubmit}>
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
      <h3>Submitted Grades</h3>
      <ul>
        {grades.map((g) => (
          <li key={g.id}>{`Student ID: ${g.studentId}, Subject: ${g.subject}, Grade: ${g.grade}`}</li> // Display subject
        ))}
      </ul>
    </div>
  );
}

export default Grades;
