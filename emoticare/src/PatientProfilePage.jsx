import React, { useState } from 'react';
import './PatientProfile.css';
import backArrow from './assets/back-arrow.png';
import profileIcon from './assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { usePatientProfile } from './context/PatientProfileContext';

const PatientProfilePage = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = usePatientProfile();
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    alert("✅ Profile updated!");
    navigate('/account/patient');
  };

  return (
    <div className="patient-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" />
      </button>

      <h2 className="profile-title">My Profile</h2>

      <div className="account-header center">
        <img src={profileIcon} alt="Profile" className="profile-icon" />
      </div>

      <h3 className="edit-heading">Edit Profile</h3>

      <form className="edit-form" onSubmit={handleSubmit}>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
        <input name="birth" type="date" value={form.birth} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <button className="save-btn" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default PatientProfilePage;
