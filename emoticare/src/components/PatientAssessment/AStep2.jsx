import React from 'react';
import './AStep2.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import backArrow from '../../assets/back-arrow.png';

import maleImg from '../../assets/gender-male.png';
import femaleImg from '../../assets/gender-female.png';

const AStep2 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();

  const answer = answers[1]; // Step 2 = index 1

  const handleSelect = (value) => {
    saveAnswer(1, value);
  };

  return (
    <div className="step2-container">
      <button className="step2-back-button" onClick={() => navigate('/assessment/step1')}>
        <img src={backArrow} alt="Back" className="step2-back-icon" />
      </button>

      <div className="step2-card">
        <div className="step2-header-row">
          <h3 className="step2-heading">Assessment</h3>
          <span className="step2-count">2 of 14</span>
        </div>

        <h2 className="step2-question">What's your official gender?</h2>

        <div className="step2-option-cards">
          <div
            className={`step2-gender-card ${answer === 'Male' ? 'selected' : ''}`}
            onClick={() => handleSelect('Male')}
          >
            <div className="step2-gender-text">
              <p className="gender-label">I am Male</p>
              <span className="gender-icon">♂</span>
            </div>
            <img src={maleImg} alt="Male" className="step2-gender-img" />
          </div>

          <div
            className={`step2-gender-card ${answer === 'Female' ? 'selected' : ''}`}
            onClick={() => handleSelect('Female')}
          >
            <div className="step2-gender-text">
              <p className="gender-label">I am Female</p>
              <span className="gender-icon">♀</span>
            </div>
            <img src={femaleImg} alt="Female" className="step2-gender-img" />
          </div>
        </div>

        <button className="step2-skip-button" onClick={() => navigate('/assessment/step3')}>
          Prefer to skip, thanks X
        </button>

        <button
          className="step2-next-button"
          onClick={() => navigate('/assessment/step3')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep2;
