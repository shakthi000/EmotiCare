import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      email: false,
      password: false,
      confirmPassword: false
    };

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = true;
      valid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = true;
      valid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Submit form
      console.log('Form submitted:', formData);
      // Add your signup logic here
    }
  };

  return (
    <div className="signup-container">
      <div className="time-display">9:41</div>
      
      <div className="signup-header">
        <h1 className="app-name">EMOTICARE</h1>
        <p className="tagline">TALK TRUST TRANSFORM</p>
      </div>
      
      <div className="signup-content">
        <h2 className="signup-title">Sign Up For Free</h2>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email..."
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">Invalid Email Address!!!</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              className={`form-input ${errors.password ? 'error' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-message">Password must be at least 6 characters</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Password Confirmation</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password..."
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error-message">Passwords don't match</p>}
          </div>
          
          <button type="submit" className="signup-button">
            Sign Up →
          </button>
        </form>
        
        <p className="login-redirect">
          Already have an account? <a href="/login" className="login-link">Sign In</a>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;