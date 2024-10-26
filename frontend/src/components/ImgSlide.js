import React, { useState, useEffect } from 'react';
import image1 from './images/AdminBuilding.jpg';
import image2 from './images/image2iitdh.jpg';
import image3 from './images/image3iitdh.jpg';
import '../Styles/ImgSlide.css';

function ImgSlide() {
  

  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={image2} className="d-block w-100" alt="Library"/>
          <div className="carousel-caption">
            <h3>Indoor Sports 24 X 7</h3>
            
          </div>
        </div>
        <div className="carousel-item">
          <img src={image1} className="d-block w-100" alt="Library Collection"/>
          <div className="carousel-caption">
            <h5>Explore Our Indoor Complex</h5>
            <p>Discover a wide variety of indoor sport facilities.</p>
          </div>
        </div>
        
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImgSlide;
