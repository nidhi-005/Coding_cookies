import React, { useEffect, useState, useContext } from 'react';
import axios from './axiosInstance';
import '../Styles/facilities.css';
import { AuthContext } from '../context/AuthContext';

function FacilityPage() {
  const [facilities, setFacilities] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      try {
        const res = await axios.get('/facilities'); // Correct API call
        setFacilities(res.data);
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
      }
    };
    fetchOccupancyData();
  }, []);

  return (
    <div className="facility-container">
      <h2>Welcome, {user?.given_name || 'Guest'}</h2>
      <p>Check the current occupancy of our indoor sports facilities.</p>
      <div className="facility-grid">
        {facilities.map((facility) => (
          <div key={facility.name} className="facility-card">
            <h3>{facility.name}</h3>
            <p>Status: {facility.currentOccupancy < facility.totalCapacity ? 'Open' : 'Full'}</p>
            <p>Current Occupancy: {facility.currentOccupancy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacilityPage;

