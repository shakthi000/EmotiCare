import React from 'react';
import './SignInAs.css';
import { useNavigate } from 'react-router-dom';

import patientImg from './assets/signin1.png';
import therapistImg from './assets/signin2.png';
import adminImg from './assets/signin3.png';
import logoImg from'./assets/logo.png'; // Ensure logo is imported for use

const SignInAs = () => {
  const navigate = useNavigate();

  return (
    <div className="signin-container">
      <div className="header-2">
        <img src={logoImg} alt="EmotiCare Logo" className="logo" width={245} height={195} />
      </div>

      <div className="signin-content">
        <h2 className="signin-title">Sign In As</h2>

        <div className="user-type-options">
          <button
            className="user-type-button patient"
            onClick={() => navigate('/signin/patient')}
          >
            <img src={patientImg} alt="Patient" className="user-icon" />
            Patient
          </button>

          <button
            className="user-type-button therapist"
            onClick={() => navigate('/signin/therapist')}
          >
            <img src={therapistImg} alt="Therapist" className="user-icon" />
            Therapist
          </button>

          <button
            className="user-type-button admin"
            onClick={() => navigate('/signin/admin')}
          >
            <img src={adminImg} alt="Admin" className="user-icon" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInAs;
