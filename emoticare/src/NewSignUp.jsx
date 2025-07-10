import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SignInForm.css';

import logoImg from './assets/logo.png';
import emailIcon from './assets/email-icon.png';
import passwordIcon from './assets/password-icon.png';
import eyeOpen from './assets/eye-open.png';
import eyeClosed from './assets/eye-closed.png';
import googleIcon from './assets/google-icon.png';
import backArrow from './assets/back-arrow.png';
import { useNavigate } from 'react-router-dom';

const NewSignUp = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Listen for Google OAuth popup message
  useEffect(() => {
  const handleOAuthMessage = (event) => {
    console.log("OAuth message received:", event);
    // if (event.origin !== window.location.origin) return;
    const { success, email } = event.data;
    if (success && email) {
      localStorage.setItem('user_id', email);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', "patient");
      window.location.href = window.location.origin + '/assessment/step1';
    } 
  };
  window.addEventListener('message', handleOAuthMessage);
  return () => window.removeEventListener('message', handleOAuthMessage);
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: !validateEmail(formData.email),
      password: formData.password.length < 6,
      confirmPassword: formData.password !== formData.confirmPassword,
    };

    setErrors(newErrors);
    const valid = !Object.values(newErrors).includes(true);

    if (valid) {
      try {
        await axios.post('http://localhost:5000/api/signup', {
          email: formData.email,
          password: formData.password,
          role: role || 'patients', // default to patient
        });
        alert('✅ Sign Up Successful!');
        navigate('/signinas');
      } catch (err) {
        alert(err.response?.data?.error || "Something went wrong!");
      }
    }
  };

  // Google OAuth signup
  const handleGoogleSignUp = () => {
    window.open(
      "http://localhost:5000/api/auth/google",
      "Signup with Google",
      "width=500,height=600"
    );
  };

  return (
    <div className="signin-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" className="back-icon" />
      </button>

      <div className="signin-header">
        <img src={logoImg} className="logo" alt="" width={245} height={195} />
        <h2 className="signin-title">Sign Up For Free</h2>
      </div>
      <div className="signin-content">
        <form onSubmit={handleSubmit} className="signin-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className={`input-icon-wrap ${errors.email ? 'error' : ''}`}>
              <img src={emailIcon} alt="email icon" className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
                value={formData.email}
                className="form-input"
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error-message">Invalid Email Address</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className={`input-icon-wrap ${errors.password ? 'error' : ''}`}>
              <img src={passwordIcon} alt="password icon" className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password..."
                className="form-input"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src={showPassword ? eyeOpen : eyeClosed}
                alt="toggle visibility"
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className={`input-icon-wrap ${errors.confirmPassword ? 'error' : ''}`}>
              <img src={passwordIcon} alt="confirm icon" className="input-icon" />
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password..."
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <img
                src={showConfirm ? eyeOpen : eyeClosed}
                alt="toggle visibility"
                className="toggle-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>
            {errors.confirmPassword && <p className="error-message">Passwords do not match</p>}
          </div>

          <button type="submit" className="signin-button">Sign Up →</button>
        </form>

        <button className="google-button" onClick={handleGoogleSignUp}>
          <img src={googleIcon} alt="Google" />
          Sign up with Google
        </button>

        <div className="signin-links">
          <p className="signup-redirect">
            Already have an account? <a href="/signinas" className="link">Sign In</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewSignUp;