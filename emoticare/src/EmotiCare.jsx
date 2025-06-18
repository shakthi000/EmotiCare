import React, { useEffect } from 'react';
import './EmotiCare.css';
import { useNavigate } from 'react-router-dom';
import logoImg from './assets/logo.png'; // Ensure logo is imported for use

const EmotiCare = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="emoti-care-container fade-in">
      <div className="emoti-care-content">
          <img src={logoImg} alt="EmotiCare Logo" className="logo" width={500} />
      </div>
    </div>
  );
};

export default EmotiCare;