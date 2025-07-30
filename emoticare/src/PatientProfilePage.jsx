import React, { useState } from 'react';
import './PatientProfile.css';
import backArrow from './assets/back-arrow.png';
import profileIcon from './assets/profile-icon.png';
import { useNavigate } from 'react-router-dom';
import { usePatientProfile } from './context/PatientProfileContext';
import axios from 'axios';

const PatientProfilePage = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = usePatientProfile();
  const [form, setForm] = useState(profile);
  const [profilePic, setProfilePic] = useState(profile.profilePic || profileIcon);
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};
    if (!form.firstName || form.firstName.trim().length < 2) newErrors.firstName = "First name required (min 2 chars)";
    if (!form.lastName || form.lastName.trim().length < 2) newErrors.lastName = "Last name required (min 2 chars)";
    if (!form.username || form.username.trim().length < 3) newErrors.username = "Username required (min 3 chars)";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.phone || !/^\d{10}$/.test(form.phone)) newErrors.phone = "Valid 10-digit phone required";
    if (!form.birth) newErrors.birth = "Birth date required";
    if (!form.gender) newErrors.gender = "Gender required";
    return newErrors;
  };

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
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
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
        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        {errors.username && <div className="error-message">{errors.username}</div>}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        <input name="birth" type="date" value={form.birth} onChange={handleChange} />
        {errors.birth && <div className="error-message">{errors.birth}</div>}
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        {errors.gender && <div className="error-message">{errors.gender}</div>}
        <button className="save-btn" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default PatientProfilePage;