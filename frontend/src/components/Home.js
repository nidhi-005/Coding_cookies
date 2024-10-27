import React, { useState } from 'react';
import About from './About';
import Gym from './images/Gym.jpg';
import Squash from './images/Squash2.jpg';
import TableTennis from './images/Tabletennis2..jpg';
import Badminton from './images/badmintono.jpg';
import '../Styles/HomeBG.css';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const images = [Gym, Squash, TableTennis, Badminton];

  const handleImageClick = () => {
    setFlipped(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFlipped(false);
    }, 300); // Updated timeout to match the new transition duration
  };

  return (
    <main className="home-background">
      <div className="content">
      <div className="explore-section">
           <h5>Explore Our Indoor Complex</h5>
           <p>Discover a wide variety of indoor sport facilities.</p>
       </div>

        <div className="gallery">
          <div className="flip-card" onClick={handleImageClick}>
            <div className="flip-card-inner" style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              <div className="flip-card-front">
                <img src={images[currentIndex]} alt="Sport" />
              </div>
              <div className="flip-card-back">
                <img src={images[(currentIndex + 1) % images.length]} alt="Sport" />
              </div>
            </div>
          </div>
        </div>

        <About />
      </div>
    </main>
  );
}

export default Home;
