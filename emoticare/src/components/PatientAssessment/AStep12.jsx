import React from 'react';
import './AStep12.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';

const stressLevels = [
  'Very Low',
  'Low',
  'Moderate',
  'High',
  'Extremely High'
];

const AStep12 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const answer = answers[11] || 3; // Default to middle value

  const handleSelect = (val) => saveAnswer(11, val);

  return (
    <div className="step12-container">
      <button className="step12-back-button" onClick={() => navigate('/assessment/step11')}>
        <img src={backArrow} alt="Back" className="step12-back-icon" />
      </button>

      <div className="step12-card">
        <div className="step12-header-row">
          <h3 className="step12-heading">Assessment</h3>
          <span className="step12-count">12 of 14</span>
        </div>

        <h2 className="step12-question">How would you rate your stress level?</h2>

        {/* Selected number above */}
        <div className="step12-selected-number">{answer}</div>

        {/* Slider-like number buttons with centered label */}
        <div className="step12-slider-numbers">
          {[1, 2, 3, 4, 5].map((num, idx) => (
            <div className="step12-slider-item" key={num}>
              <button
                className={`step12-slider-dot${answer === num ? ' selected' : ''}`}
                onClick={() => handleSelect(num)}
                type="button"
              >
                {num}
              </button>
              <div
                className={`step12-slider-label${answer === num ? ' selected' : ''}`}
              >
                {answer === num ? stressLevels[idx] : ''}
              </div>
            </div>
          ))}
        </div>

        <button
          className="step12-next-button"
          onClick={() => navigate('/assessment/step13')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep12;