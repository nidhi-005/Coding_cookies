import React, { useEffect, useState } from 'react';
import axios from 'axios';
 // Custom CSS for the square blocks
import '../Styles/OptionsPage.css';

function OptionsPage() {
  const [occupancyData, setOccupancyData] = useState({
    badminton: { count: 0, status: 'Loading...' },
    tableTennis: { count: 0, status: 'Loading...' },
    squash: { count: 0, status: 'Loading...' },
    gym: { count: 0, status: 'Loading...' },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/occupancy');
        setOccupancyData(res.data);
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="options-container">
      {Object.entries(occupancyData).map(([facility, data]) => (
        <div key={facility} className="facility-block">
          <h3>{facility.charAt(0).toUpperCase() + facility.slice(1)}</h3>
          <p>Occupancy: {data.count}</p>
          <p>Status: {data.status}</p>
        </div>
      ))}
    </div>
  );
}

export default OptionsPage;
