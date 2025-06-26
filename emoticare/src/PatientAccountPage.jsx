import React from 'react';
import './PatientProfile.css';
import { useNavigate } from 'react-router-dom';
import { usePatientProfile } from './context/PatientProfileContext';
import backArrow from './assets/back-arrow.png';
import profileIcon from './assets/profile-icon.png';

const PatientAccountPage = () => {
  const navigate = useNavigate();
  const { profile } = usePatientProfile();

  return (
    <div className="patient-profile-container">
      <button className="back-button" onClick={() => navigate('/dashboard/patient')}>
        <img src={backArrow} alt="Back" />
      </button>

      <h2 className="profile-title">My Account</h2>

      <div className="account-header">
        <img src={profileIcon} alt="Profile" className="profile-icon" />
        <div>
          <p className="account-name">{profile.firstName}</p>
          <p className="account-email">{profile.email}</p>
          <button className="edit-btn" onClick={() => navigate('/profile/patient')}>Edit Profile</button>
        </div>
      </div>

      <ul className="account-menu">
        <li onClick={() => navigate('/patient/profile')}>My Profile</li>
        <li>Reports</li>
        <li>Languages</li>
        <li>Location</li>
        <li>Security</li>
        <li>Clear Cache</li>
        <li>Clear History</li>
        <li className="logout" onClick={() => navigate('/signinas')}>Log Out</li>
      </ul>
    </div>
  );
};

export default PatientAccountPage;
