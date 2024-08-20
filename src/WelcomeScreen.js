import React from 'react';
import './WelcomeScreen.css'; // Create this CSS file for styling

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Review App</h1>
      <p>Our job is to Streamline the Review Process while maintaining compelling and engaging reviews for your personal and/or professional account.</p>
      <button onClick={onStart} className="start-button">Start App</button>
      <footer>
        <a href="https://b1becker.github.io/" target="_blank" rel="noopener noreferrer">
        <p>Made by Brian Becker</p>
        </a>
        
      </footer>
    </div>
  );
};

export default WelcomeScreen;
