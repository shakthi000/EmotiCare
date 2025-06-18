import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import './AStep1.css';
import backArrow from '../../assets/back-arrow.png';

const options = [
  "I wanna reduce stress",
  "I wanna try EMOTICARE AI Therapy 💜",
  "I want to cope with trauma",
  "I want to be a better person",
  "Just trying out the app, mate!"
];

const AStep1 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();

  const answer = answers[0];

  const handleSelect = (value) => {
    saveAnswer(0, value);
  };

  return (
    <div className="step1-container">
      <button className="step1-back-button" onClick={() => navigate('/signin/patient')}>
        <img src={backArrow} alt="Back" className="step1-back-icon" />
      </button>

      <div className="step1-card">
        <div className="step1-header-row">
          <h3 className="step1-heading">Assessment</h3>
          <span className="step1-count">1 of 14</span>
        </div>

        <h2 className="step1-question">What's your health goal?</h2>

        <div className="step1-options">
          {options.map((option, idx) => (
            <button
              key={idx}
              className={`step1-option ${answer === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          className="step1-next-button"
          onClick={() => navigate('/assessment/step2')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep1;
