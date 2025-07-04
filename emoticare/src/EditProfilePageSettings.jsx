import React, { useState } from 'react';
import './PatientProfile.css';
import profileIcon from './assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { usePatientProfile } from './context/PatientProfileContext';

const EditProfilePageSettings = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    alert("✅ Profile updated!");
  };

  return (
    <div className="patient-profile-container">

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
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input name="username" value={form.username} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="birth">Date of Birth</label>
          <input type="date" name="birth" value={form.birth} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="gender">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <button className="save-btn" type="submit">Save</button>
      </form>

    </div>
  );
};

export default EditProfilePageSettings;