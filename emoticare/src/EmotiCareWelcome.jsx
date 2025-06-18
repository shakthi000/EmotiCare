import React from 'react';
import './EmotiCareWelcome.css';
import { useNavigate } from 'react-router-dom';
import welcomeImage from './assets/welcome.png';

const EmotiCareWelcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-heading">
          Welcome to the<br />
          <span className="emoti-care-name">Emoticare</span><br />
          AI Therapist
        </h1>

        <p className="welcome-subtext">
          Your mindful mental health AI companion<br />
          for everyone, anywhere <span className="smiley">🍃</span>
        </p>

        <img src={welcomeImage} alt="Welcome Illustration" className="welcome-image" />

        <button className="get-started-button" onClick={() => navigate('/intro')}>
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default EmotiCareWelcome;
