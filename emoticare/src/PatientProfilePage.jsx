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
  const [profilePic, setProfilePic] = useState(profile.profilePic || profileIcon);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile pic change
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setProfile(form);  // updates on backend/context
    alert("✅ Profile updated!");
    navigate('/account/patient');
  };

  return (
    <div className="patient-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" />
      </button>

      <h2 className="profile-title">My Profile</h2>

      <div className="account-header center" style={{display:"flex",flexDirection:"column"}}>
        <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
          <img
            src={profilePic}
            alt="Profile"
            className="profile-icon"
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePicChange}
          />
        </label>
        <div style={{ fontSize: '0.8em', color: '#975dbd', marginTop: 8 }}>
          Click image to change
        </div>
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