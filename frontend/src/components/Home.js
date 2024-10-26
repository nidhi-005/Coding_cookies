import React from 'react';
import About from './About';

function Home() {
  return (
    <main className="home-background">
      <div className="content">
        <h5>Explore Our Indoor Complex</h5>
        <p>Discover a wide variety of indoor sport facilities.</p>
        <About />
      </div>
    </main>
  );
}

export default Home;
