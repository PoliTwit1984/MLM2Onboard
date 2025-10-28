import React from 'react';
import './AppScreensCarousel.css';

export const AppScreensCarousel = (): JSX.Element => {
  // Array of screen images - we'll duplicate them for seamless infinite scroll
  const screens = [
    '/images/app-screens/screen1.png',
    '/images/app-screens/screen2.png', 
    '/images/app-screens/screen3.png',
    '/images/app-screens/screen4.png',
    '/images/app-screens/screen5.png',
    '/images/app-screens/screen6.png'
  ];

  // Duplicate screens for infinite loop effect
  const allScreens = [...screens, ...screens];

  return (
    <section className="app-screens-carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {allScreens.map((screen, index) => (
            <div key={index} className="screen-item">
              <img 
                src={screen} 
                alt={`App screen ${(index % screens.length) + 1}`}
                className="screen-image"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Gradient overlays for edge fading effect */}
      <div className="gradient-left" />
      <div className="gradient-right" />
    </section>
  );
};