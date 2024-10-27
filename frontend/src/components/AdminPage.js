import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AdminCheckInOut.css';

function AdminPage() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [sport, setSport] = useState('Badminton');
  const [students, setStudents] = useState([]);

  // Fetch students who have checked in
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/checkins');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      await axios.post('http://localhost:5000/api/checkin', { name, rollNumber, sport });
      setName('');
      setRollNumber('');
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async (studentId) => {
    try {
      await axios.post(`http://localhost:5000/api/checkout/${studentId}`);
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Check-In/Check-Out</h2>

      <div className="check-in-out-section">
        <div className="section check-in-section">
          <h3>Check In</h3>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="sport">Sport</label>
            <select
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Badminton">Badminton</option>
              <option value="TableTennis">Table Tennis</option>
              <option value="Squash">Squash</option>
              <option value="Gym">Gym</option>
            </select>
          </div>
          <button className="submit-button" onClick={handleCheckIn}>Check In</button>
        </div>

        <div className="section check-out-section">
          <h3>Check Out</h3>
          <div className="student-list">
            {students.map((student) => (
              <div key={student._id} className="student-item">
                <p>{student.name} ({student.rollNumber}) - {student.sport}</p>
                <button className="checkout-button" onClick={() => handleCheckOut(student._id)}>Check Out</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
