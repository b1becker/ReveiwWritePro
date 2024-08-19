import React from 'react';
import './WelcomeScreen.css'; // Create this CSS file for styling

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Review App</h1>
      <p>Our job is to Streamline the Review Process while maintaining compelling and engaging reviews for your account.</p>
      <button onClick={onStart} className="start-button">Start App</button>
      <footer>
        <p>Made by Brian Becker</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
