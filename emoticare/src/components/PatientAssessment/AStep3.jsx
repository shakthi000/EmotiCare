import React, { useState } from 'react';
import './AStep3.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import backArrow from '../../assets/back-arrow.png';
import axios from 'axios';

const AStep3 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();

  const [selectedAge, setSelectedAge] = useState(answers[2] || 18);
  const ageRange = Array.from({ length: 85 }, (_, i) => i + 16); // 16–100

const handleNext = async () => {
  saveAnswer(2, selectedAge);
  const user_id = localStorage.getItem('user_id');
  try {
    await axios.post('http://localhost:5000/api/step3', {
      user_id,
      age: selectedAge,
    });
    navigate('/assessment/step4');
  } catch (err) {
    alert("❌ Failed to save Step 3");
  }
};


  return (
    <div className="step3-container">
      <button className="step3-back-button" onClick={() => navigate('/assessment/step2')}>
        <img src={backArrow} alt="Back" className="step3-back-icon" />
      </button>

      <div className="step3-card">
        <div className="step3-header-row">
          <h3 className="step3-heading">Assessment</h3>
          <span className="step3-count">3 of 14</span>
        </div>

        <h2 className="step3-question">What's your age?</h2>

        <div className="step3-scroll">
          {ageRange.map((age) => (
            <button
              key={age}
              className={`step3-age-btn ${selectedAge === age ? 'selected' : ''}`}
              onClick={() => setSelectedAge(age)}
            >
              {age}
            </button>
          ))}
        </div>

        <button className="step3-next-button" onClick={handleNext}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep3;
