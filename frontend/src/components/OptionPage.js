import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/OptionsPage.css'; // Custom CSS for the square blocks

import badmintonImage from './images/badminton-court.jpg';
import tableTennisImage from './images/tt.jpg';
import squashImage from './images/squash.jpg';
import gymImage from './images/Gym.jpg';
import foosballImage from './images/foosball.jpg';


function OptionsPage() {
  const [occupancyData, setOccupancyData] = useState({
    badminton: { count: 0, status: 'Loading...', image: badmintonImage},
    tableTennis: { count: 0, status: 'Loading...', image: tableTennisImage },
    squash: { count: 0, status: 'Loading...', image: squashImage },
    gym: { count: 0, status: 'Loading...', image: gymImage },
    Foosball: { count: 0, status: 'Loading...', image: foosballImage },
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
    <div>
        <h2 className="heading">Facility Occupancy Status</h2>
        <div className='options-container'>
        {Object.entries(occupancyData).map(([facility, data]) => (
        <div key={facility} className="facility-block">
          <img src={data.image} alt={`${facility} icon`} className="facility-image" />
          <h3>{facility.charAt(0).toUpperCase() + facility.slice(1)}</h3>
          <p>Occupancy: {data.count}</p>
          <p>Status: {data.status}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default OptionsPage;