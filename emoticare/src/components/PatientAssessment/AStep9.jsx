import React from 'react';
import './AStep9.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';
import axios from 'axios';

// image imports
import med1 from '../../assets/step9-1.png';
import med2 from '../../assets/step9-2.png';
import med3 from '../../assets/step9-3.png';
import med4 from '../../assets/step9-3.png';

const optionData = [
  {
    label: 'Prescribed Medications',
    image: med1,
  },
  {
    label: 'Over the Counter Supplements',
    image: med2,
  },
  {
    label: "I'm not taking any",
    image: med3,
  },
  {
    label: 'Prefer not to say',
    image: med4,
  }
];

const AStep9 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const answer = answers[8];

  const handleSelect = async (value) => {
  saveAnswer(8, value);
  const user_id = localStorage.getItem("user_id");

  try {
    await axios.post("http://localhost:5000/api/step9", {
      user_id,
      medication_status: value
    });
  } catch (err) {
    alert("❌ Failed to save Step 9");
  }
};

  return (
    <div className="step9-container">
      <button className="step9-back-button" onClick={() => navigate('/assessment/step8')}>
        <img src={backArrow} alt="Back" className="step9-back-icon" />
      </button>

      <div className="step9-card">
        <div className="step9-header-row">
          <h3 className="step9-heading">Assessment</h3>
          <span className="step9-count">9 of 14</span>
        </div>

        <h2 className="step9-question">Are you taking any medications?</h2>

        <div className="step9-options">
          {optionData.map(({ label, image }, index) => (
            <button
              key={index}
              className={`step9-option ${answer === label ? 'selected' : ''}`}
              onClick={() => handleSelect(label)}
            >
              <img src={image} alt={label} className="step9-option-img" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button
          className="step9-next-button"
          onClick={() => navigate('/assessment/step10')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep9;
