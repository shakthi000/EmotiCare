// Footer.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Footer.css'; // style here

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <button
        className={isActive('/dashboard/patient') ? 'active' : ''}
        onClick={() => navigate('/dashboard/patient')}
      >
        😊
      </button>
      <button
        className={isActive('/analytics/patient') ? 'active' : ''}
        onClick={() => navigate('/analytics/patient')}
      >
        ❤
      </button>
      <button
        className={isActive('/chooseai/patient') ? 'active' : ''}
        onClick={() => navigate('/chooseai/patient')}
      >
        🧒
      </button>
      <button
        className={isActive('/resources/patient') ? 'active' : ''}
        onClick={() => navigate('/resources/patient')}
      >
        🔋
      </button>
      <button
        className={isActive('/settings/patient') ? 'active' : ''}
        onClick={() => navigate('/settings/patient')}
      >
        🏴
      </button>
    </div>
  );
};

export default Footer;
