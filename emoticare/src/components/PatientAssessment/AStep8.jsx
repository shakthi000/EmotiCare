import React from 'react';
import './AStep8.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';
import axios from 'axios';

const sleepOptions = [
  { label: 'Excellent', hours: '7–9 HOURS', emoji: '😊' },
  { label: 'Good', hours: '6–7 HOURS', emoji: '🙂' },
  { label: 'Fair', hours: '5 HOURS', emoji: '😐' },
  { label: 'Poor', hours: '3–4 HOURS', emoji: '☹️' },
  { label: 'Worst', hours: '< 3 HOURS', emoji: '😵' }
];

const AStep8 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const selectedIndex = sleepOptions.findIndex(opt => opt.label === answers[7]);

  const handleSelect = async (index) => {
  const label = sleepOptions[index].label;
  saveAnswer(7, label);
  const user_id = localStorage.getItem("user_id");

  try {
    await axios.post("http://localhost:5000/api/step8", {
      user_id,
      sleep_quality: label
    });
  } catch (err) {
    alert("❌ Failed to save Step 8");
  }
};

  return (
    <div className="step8-container">
      <button className="step8-back-button" onClick={() => navigate('/assessment/step7')}>
        <img src={backArrow} alt="Back" className="step8-back-icon" />
      </button>

      <div className="step8-card">
        <div className="step8-header-row">
          <h3 className="step8-heading">Assessment</h3>
          <span className="step8-count">8 of 14</span>
        </div>

        <h2 className="step8-question">How would you rate your sleep quality?</h2>

        <div className="step8-slider-layout">
          <ul className="step8-scale">
            {sleepOptions.map((option, index) => (
              <li key={index} className={`step8-label ${selectedIndex === index ? 'active' : ''}`}>
                <span className="step8-label-title">{option.label}</span>
                <span className="step8-label-subtext">{option.hours}</span>
              </li>
            ))}
          </ul>

          <div className="step8-slider-center">
            <div className="step8-slider-line" />
            {sleepOptions.map((_, index) => (
              <div
                key={index}
                className={`step8-slider-dot ${selectedIndex === index ? 'active' : ''}`}
                onClick={() => handleSelect(index)}
              >
                {selectedIndex === index && (
                  <div className="step8-thumb">{sleepOptions[index].emoji}</div>
                )}
              </div>
            ))}
          </div>

          <div className="step8-emoji-buttons">
            {sleepOptions.map((option, index) => (
              <button
                key={index}
                className={`step8-emoji-btn ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => handleSelect(index)}
              >
                {option.emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          className="step8-next-button"
          onClick={() => navigate('/assessment/step9')}
          disabled={selectedIndex === -1}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep8;
