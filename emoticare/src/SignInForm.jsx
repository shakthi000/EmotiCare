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
import ForgotPasswordModal from './ForgotPasswordModal';

const SignInForm = ({ role }) => {
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  // Listen for Google OAuth popup message
  // filepath: c:\Users\DELL\Desktop\shakthi\EmotiCare\emoticare\src\SignInForm.jsx
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

  const handleGoogleLogin = () => {
    window.open(
      "http://localhost:5000/api/auth/google",
      "Login with Google",
      "width=500,height=600"
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = { email: false, password: false };
    let valid = true;

    if (!validateEmail(formData.email)) {
      newErrors.email = true;
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = true;
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const res = await axios.post('http://localhost:5000/api/signin', {
          email: formData.email,
          password: formData.password,
          role: role === 'admin' ? 'admins' : role + 's'
        });

        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('userEmail', res.data.user_id);
        localStorage.setItem('userRole', role);

        alert(res.data.message);

        if (role === 'patient') navigate('/assessment/step1');
        else if (role === 'therapist') navigate('/dashboard/therapist');
        else if (role === 'admin') navigate('/dashboard/admin');
      } catch (err) {
        alert(err.response?.data?.error || 'Login failed');
      }
    }
  };

  return (
    <div className="signin-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" className="back-icon" />
      </button>

      <div className="signin-header">
        <img src={logoImg} className="logo" alt="" width={245} height={195} />
        <h2 className="signin-title">Sign In</h2>
        <h1 className="app-name">EMOTICARE AI {role.charAt(0).toUpperCase() + role.slice(1)}</h1>
      </div>

      <div className="signin-content">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className={`input-icon-wrap ${errors.email ? 'error' : ''}`}>
              <img src={emailIcon} alt="email icon" className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="form-input"
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error-message">Invalid Email Address</p>}
          </div>

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

          <button type="submit" className="signin-button">Sign In →</button>
        </form>

        <div className="social-login-section">
          <div className="social-login-icons">
            <button className="google-button" onClick={handleGoogleLogin} >
              <img src={googleIcon} alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="signin-links">
          <p className="signup-redirect">
            Don't have an account? <a href="/new-signup" className="link">Sign Up</a>.
          </p>
          <a className="link" onClick={() => setShowForgot(true)} style={{ cursor: 'pointer' }}>Forgot Password</a>
          {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
        </div>
      </div>
    </div>
  );
};

export default SignInForm;