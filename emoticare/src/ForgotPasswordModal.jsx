import React, { useState } from 'react';
import './SignInForm.css';
import otpImage from './assets/otpimg.png';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!validateEmail(email)) {
    setError('Invalid email format!');
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/forgot-password", { email });
    alert(res.data.message); // shows "OTP sent to your email"
    onClose(); // optionally close the modal
  } catch (err) {
    const msg = err.response?.data?.error || 'Something went wrong';
    setError(`❌ ${msg}`);
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <IoMdClose size={24} />
        </button>

        <div className="signin-header">
          <img
            src={otpImage}
            alt="OTP Illustration"
            style={{ width: '100%', maxWidth: '280px', borderRadius: '20px' }}
          />
        </div>
        <h2 className="signin-title">Forgot Password?</h2>
        <div className="signin-content" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#975dbd', fontWeight: 600 }}>
            Enter your registered email
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: '16px',width: '80%' }}
            />
            {error && <p className="error-message">{error}</p>}

            <button className="signin-button" style={{ marginTop: '20px' }} type="submit">
              Re-Send Password →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
