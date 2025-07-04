import React, { useState } from 'react';
import './AStep4.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import backArrow from '../../assets/back-arrow.png';
import axios from 'axios';

const AStep4 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();

  const [unit, setUnit] = useState('kg');
  const [weight, setWeight] = useState(answers[3] || 128);

  const handleNext = async () => {
  const selected = `${weight} ${unit}`;
  saveAnswer(3, selected);

  try {
    const user_id = localStorage.getItem("user_id");
    await axios.post("http://localhost:5000/api/step4", {
      user_id,
      weight: selected
    });
    navigate('/assessment/step5');
  } catch (err) {
    alert("❌ Error saving Step 4");
  }
};


  const weightRange = Array.from({ length: 100 }, (_, i) => i + (unit === 'kg' ? 40 : 90)); // 40-139 kg or 90–189 lbs

  return (
    <div className="step4-container">
      <button className="step4-back-button" onClick={() => navigate('/assessment/step3')}>
        <img src={backArrow} alt="Back" className="step4-back-icon" />
      </button>

      <div className="step4-card">
        <div className="step4-header-row">
          <h3 className="step4-heading">Assessment</h3>
          <span className="step4-count">4 of 14</span>
        </div>

        <h2 className="step4-question">What's your weight?</h2>

        <div className="unit-toggle">
          <button
            className={unit === 'kg' ? 'active' : ''}
            onClick={() => setUnit('kg')}
          >
            kg
          </button>
          <button
            className={unit === 'lbs' ? 'active' : ''}
            onClick={() => setUnit('lbs')}
          >
            lbs
          </button>
        </div>
            
          <div className="weight-display">
          <span>{weight}</span>
          <span className="unit">{unit}</span>
        </div>

        <div className="weight-scroll">
          {weightRange.map((w) => (
            <button
              key={w}
              className={`weight-option ${w === weight ? 'selected' : ''}`}
              onClick={() => setWeight(w)}
            >
              {w}
            </button>
          ))}
        </div>

        <button className="step4-next-button" onClick={handleNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep4;
